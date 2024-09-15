import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { RoleName } from './enums/role-name';
import { Roles } from '../decorators/roles-auth.decorator';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}

    @ApiOperation({ summary: 'Create role' })
    @ApiResponse({ status: HttpStatus.CREATED, type: Role })
    @Post()
    @Roles(RoleName.Admin)
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({ summary: 'Get roles by value' })
    @ApiResponse({ status: HttpStatus.OK, type: Role })
    @ApiQuery({ name: 'name', enum: RoleName })
    @Get(':value')
    @Roles(RoleName.Admin)
    findOne(@Param('value') value: RoleName) {
        return this.roleService.findOne(value);
    }

    @ApiOperation({ summary: 'Update an existing role description' })
    @ApiResponse({ status: HttpStatus.OK, type: Role })
    @Patch()
    @Roles(RoleName.Admin)
    update(@Body() updateRoleDto: CreateRoleDto) {
        return this.roleService.update(updateRoleDto);
    }
}
