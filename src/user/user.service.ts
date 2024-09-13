import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RolesService,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOneBy({ email: createUserDto.email });
        if (existUser) throw new HttpException('User with this email is exists', HttpStatus.CONFLICT);

        const role = await this.roleService.findUserRoleOrCreate();

        return await this.userRepository.save({
            ...createUserDto,
            roles: [role],
        });
    }

    async updateUser(id: string, dto: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }

        this.userRepository.merge(user, dto);
        return await this.userRepository.save(user);
    }

    async findOne(email: string) {
        return await this.userRepository.findOne({
            where: { email },
            relations: { boards: true, roles: true },
        });
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findOne({
            where: { id: dto.userId },
            relations: { roles: true },
        });

        const role = await this.roleService.getRoleByValue(dto.roleValue);

        if (role && user) {
            user.roles.push(role);
            return await user.save();
        }

        throw new HttpException('Users or roles not found', HttpStatus.NOT_FOUND);
    }

    async banUser(dto: BanUserDto) {
        const user = await this.userRepository.findOneBy({ id: dto.userId });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        return await user.save();
    }
}
