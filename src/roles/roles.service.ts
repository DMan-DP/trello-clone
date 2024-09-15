import { ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { baseCreatedRoles } from './enums/role-name';

@Injectable()
export class RolesService implements OnModuleInit {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async onModuleInit() {
        for (let i = 0; i < baseCreatedRoles.length; i++) {
            const role = await this.findOne(baseCreatedRoles[i].name);
            if (!role) await this.createRole(baseCreatedRoles[i]);
        }
    }

    async createRole(createRoleDto: CreateRoleDto) {
        const candidate = await this.roleRepository.findOneBy({ name: createRoleDto.name });
        if (candidate) {
            throw new ConflictException(`Role ${createRoleDto.name} already exists`);
        }

        return await this.roleRepository.save(createRoleDto);
    }

    async findOne(value: string) {
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
}
