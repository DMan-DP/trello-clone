import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEnum } from './enums/role.enum';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async createRole(dto: CreateRoleDto) {
        const candidate = await this.roleRepository.findOneBy({ role: dto.value });
        if (candidate) {
            throw new HttpException('Role with this value is exists', HttpStatus.CONFLICT);
        }

        return await this.roleRepository.save(dto);
    }

    async findUserRoleOrCreate() {
        const userRole = await this.roleRepository.findOneBy({ role: RoleEnum.User });
        if (userRole) return userRole;

        return await this.roleRepository.save({
            role: RoleEnum.User,
            description: 'Base user role',
        });
    }

    async getRoleByValue(value: RoleEnum) {
        return await this.roleRepository.findOne({ where: { role: value } });
    }

    async updateRoleDescription(value: RoleEnum, dto: UpdateRoleDto) {
        const role = await this.roleRepository.findOneBy({ role: value });
        if (!role) {
            throw new NotFoundException(`Role ${value} not found`);
        }

        role.description = dto.description;
        return await role.save();
    }
}
