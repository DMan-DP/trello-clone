import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEnum } from './enums/role.enum';

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
    @Get(':value')
    getByValue(@Param('value') value: RoleEnum) {
        return this.roleService.getRoleByValue(value);
    }

    @ApiOperation({ summary: 'Update roles description' })
    @ApiResponse({ status: HttpStatus.OK, type: Role })
    @Patch(':value')
    updateRoleDescription(@Param('value') value: RoleEnum, @Body() dto: UpdateRoleDto) {
        return this.roleService.updateRoleDescription(value, dto);
    }
}
