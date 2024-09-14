import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import * as argon2 from 'argon2';

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
            email: createUserDto.email,
            password: await argon2.hash(createUserDto.password),
            roles: [role],
        });
    }

    async findOne(id: string) {
        return await this.userRepository.findOne({
            where: { id: id },
            relations: { boards: true, roles: true },
        });
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async update(updateUserDto: UpdateUserDto) {
        const existUser = await this.userRepository.findOneBy({ id: updateUserDto.id });
        if (!existUser) {
            throw new NotFoundException(`User ${updateUserDto.id} not found}`);
        }

        this.userRepository.merge(existUser, {
            ...updateUserDto,
            password: await argon2.hash(updateUserDto.password),
        });

        return await this.userRepository.save(existUser);
    }

    async addRole(addRoleDto: AddRoleDto) {
        const user = await this.userRepository.findOne({
            where: { id: addRoleDto.id },
            relations: { roles: true },
        });

        const role = await this.roleService.findOne(addRoleDto.roleName);

        if (role && user) {
            user.roles.push(role);
            return await user.save();
        }

        throw new NotFoundException('Users or role not found');
    }

    async ban(banUserDto: BanUserDto) {
        const user = await this.userRepository.findOneBy({ id: banUserDto.id });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.banned = true;
        user.banReason = banUserDto.banReason;
        return await user.save();
    }
}
