import { Body, Controller, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AddRoleDto } from './dto/add-role.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { BanUserDto } from './dto/ban-user.dto';
import { RoleEnum } from '../roles/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Get user by email' })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @Get(':id')
    findOne(@Param('id') email: string) {
        return this.userService.findOne(email);
    }

    @ApiOperation({ summary: 'Update user email' })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.updateUser(id, dto);
    }

    @ApiOperation({ summary: 'Add roles for user' })
    @ApiResponse({ status: HttpStatus.OK })
    @Roles(RoleEnum.Admin)
    @UseGuards(RoleGuard)
    @Post('role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @ApiOperation({ summary: ' Ban user' })
    @ApiResponse({ status: HttpStatus.OK })
    @Roles(RoleEnum.Admin)
    @UseGuards(RoleGuard)
    @Post('/ban')
    banUser(@Body() dto: BanUserDto) {
        return this.userService.banUser(dto);
    }
}
