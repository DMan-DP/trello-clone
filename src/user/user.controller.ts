import { Body, Controller, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AddRoleDto } from './dto/add-role.dto';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { BanUserDto } from './dto/ban-user.dto';
import { RoleName } from '../roles/enums/role-name';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    //not required because we create user on registration
    //@ApiOperation({ summary: 'Create new user' })
    //@ApiResponse({ status: HttpStatus.CREATED, type: User })
    //@Post()
    //createUser(@Body() createUserDto: CreateUserDto) {
    //    return this.userService.createUser(createUserDto);
    //}

    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: HttpStatus.OK, type: [User] })
    @Get()
    @Roles(RoleName.Admin)
    findAll() {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @Patch(':id')
    update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Add roles for user' })
    @ApiResponse({ status: HttpStatus.OK })
    @Post('role')
    @Roles(RoleName.Admin)
    @UseGuards(LocalAuthGuard)
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.userService.addRole(addRoleDto);
    }

    @ApiOperation({ summary: ' Ban user' })
    @ApiResponse({ status: HttpStatus.OK })
    @Post('/ban')
    @Roles(RoleName.Admin)
    ban(@Body() banUserDto: BanUserDto) {
        return this.userService.ban(banUserDto);
    }
}
