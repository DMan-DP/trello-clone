import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleName } from './enums/role-name';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async createRole(createRoleDto: CreateRoleDto) {
        const candidate = await this.roleRepository.findOneBy({ name: createRoleDto.name });
        if (candidate) {
            throw new ConflictException(`Role ${createRoleDto.name} already exists`);
        }

        return await this.roleRepository.save(createRoleDto);
    }

    async findOne(value: RoleName) {
        return await this.roleRepository.findOne({ where: { name: value } });
    }

    async update(updateRoleDto: CreateRoleDto) {
        const existRole = await this.roleRepository.findOneBy({ name: updateRoleDto.name });
        if (!existRole) {
            throw new NotFoundException(`Role ${updateRoleDto.name} not found`);
        }

        this.roleRepository.merge(existRole, updateRoleDto);
        return await this.roleRepository.save(existRole);
    }

    async findUserRoleOrCreate() {
        const userRole = await this.roleRepository.findOneBy({ name: RoleName.User });
        if (userRole) return userRole;

        return await this.roleRepository.save({
            name: RoleName.User,
            description: 'Base user role',
        });
    }
}
