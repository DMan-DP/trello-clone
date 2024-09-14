import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { RoleName } from './enums/role-name';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}

    @ApiOperation({ summary: 'Create roles' })
    @ApiResponse({ status: HttpStatus.CREATED, type: Role })
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({ summary: 'Get roles by value' })
    @ApiResponse({ status: HttpStatus.OK, type: Role })
    @ApiQuery({ name: 'name', enum: RoleName })
    @Get(':value')
    findOne(@Param('value') value: RoleName) {
        return this.roleService.findOne(value);
    }

    @ApiOperation({ summary: 'Update roles description' })
    @ApiResponse({ status: HttpStatus.OK, type: Role })
    @Patch()
    update(@Body() updateRoleDto: CreateRoleDto) {
        return this.roleService.update(updateRoleDto);
    }
}
