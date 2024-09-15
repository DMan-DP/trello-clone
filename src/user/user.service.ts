import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import * as argon2 from 'argon2';
import { UserRoleDto } from './dto/user-role.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RolesService,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOneBy({ email: createUserDto.email });
        if (existUser) throw new ConflictException('User with this email is exists');

        const role = await this.roleService.findUserRoleOrCreate();

        return await this.userRepository.save({
            email: createUserDto.email,
            password: await argon2.hash(createUserDto.password),
            roles: [role],
        });
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (user.banned) throw new ForbiddenException({ message: 'User is banned', reason: user.banReason });
        return user;
    }

    async findOneByEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        if (user.banned) throw new ForbiddenException({ message: 'User is banned', reason: user.banReason });
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const existUser = await this.userRepository.findOneBy({ id });
        if (!existUser) {
            throw new NotFoundException(`User ${id} not found}`);
        }

        const password = updateUserDto.password ? await argon2.hash(updateUserDto.password) : undefined;
        this.userRepository.merge(existUser, {
            ...updateUserDto,
            password,
        });

        return await this.userRepository.save(existUser);
    }

    async delete(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (user.banned) throw new ForbiddenException({ message: 'User is banned', reason: user.banReason });
        return await this.userRepository.remove(user);
    }

    async addRole(addRoleDto: UserRoleDto) {
        const user = await this.userRepository.findOne({
            where: { id: addRoleDto.id },
            relations: { roles: true },
        });
        if (!user) throw new NotFoundException(`User ${addRoleDto.id} not found`);

        const role = await this.roleService.findOne(addRoleDto.roleName);
        if (!role) throw new NotFoundException(`Role ${addRoleDto.roleName} not found`);

        if (user.roles.indexOf(role) !== -1) {
            throw new ConflictException(`User ${addRoleDto.id} already have role ${addRoleDto.roleName}`);
        }

        user.roles.push(role);
        await this.userRepository.save(user);
        return true;
    }

    async removeRole(removeRoleDto: UserRoleDto) {
        const user = await this.userRepository.findOne({
            where: { id: removeRoleDto.id },
            relations: { roles: true },
        });
        if (!user) throw new NotFoundException(`User ${removeRoleDto.roleName} not found`);

        const role = await this.roleService.findOne(removeRoleDto.roleName);
        if (!role) throw new NotFoundException(`User ${removeRoleDto.id} not found`);

        const roleIndex = user.roles.indexOf(role);
        if (roleIndex === -1) {
            throw new NotFoundException(`User ${removeRoleDto.id} not have role ${removeRoleDto.roleName}`);
        }

        user.roles.slice(roleIndex, 1);
        await this.userRepository.save(user);
        return true;
    }

    async ban(banUserDto: BanUserDto) {
        const user = await this.userRepository.findOneBy({ id: banUserDto.id });
        if (!user) throw new NotFoundException('User not found');
        user.banned = true;
        user.banReason = banUserDto.banReason;
        await this.userRepository.save(user);
        return true;
    }

    async unBan(banUserDto: BanUserDto) {
        const user = await this.userRepository.findOneBy({ id: banUserDto.id });
        if (!user) throw new NotFoundException(`User ${banUserDto.id} not found`);
        if (!user.banned) throw new ConflictException(`User ${banUserDto.id} is not baned`);
        user.banned = false;
        user.banReason = null;
        await this.userRepository.save(user);
        return true;
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async isConnectedToBoard(id: string, boardId: string) {
        const user = await this.userRepository.findOne({
            where: {
                id,
                boards: { id: boardId },
            },
            relations: { boards: true },
        });

        if (!user) throw new UnauthorizedException('User not connected to this board');
        return true;
    }

    async isConnectedToList(id: string, listId: string) {
        const user = await this.userRepository.findOne({
            where: {
                id,
                boards: { lists: { id: listId } },
            },
            relations: ['boards', 'boards.lists'],
        });

        if (!user) throw new UnauthorizedException('User not connected to this list');
        return true;
    }
}
