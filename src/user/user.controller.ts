import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Patch,
    Post,
    Request,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoleDto } from './dto/user-role.dto';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { BanUserDto } from './dto/ban-user.dto';
import { RoleName } from '../roles/enums/role-name';
import { UpdateUserDto } from './dto/update-user.dto';
import { PayloadRequest } from '../auth/requests/payload-request';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Get user' })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    findOne(@Request() request: PayloadRequest) {
        return this.userService.findOne(request.user.id);
    }

    @ApiOperation({ summary: 'Update an existing user' })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @Patch()
    @UseInterceptors(ClassSerializerInterceptor)
    update(@Request() request: PayloadRequest, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(request.user.id, updateUserDto);
    }

    @ApiOperation({ summary: 'Delete an existing user' })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK })
    @Delete()
    delete(@Request() request: PayloadRequest) {
        return this.userService.delete(request.user.id);
    }

    @ApiOperation({ summary: 'Add roles for an existing user' })
    @ApiQuery({ type: UserRoleDto })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK })
    @Post('role')
    @Roles(RoleName.Admin)
    addRole(@Body() addRoleDto: UserRoleDto) {
        return this.userService.addRole(addRoleDto);
    }

    @ApiOperation({ summary: 'Delete roles for an existing user' })
    @ApiQuery({ type: UserRoleDto })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK })
    @Delete('role')
    @Roles(RoleName.Admin)
    removeRole(removeRoleDto: UserRoleDto) {
        return this.userService.removeRole(removeRoleDto);
    }

    @ApiOperation({ summary: 'Ban an existing user' })
    @ApiQuery({ type: BanUserDto })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK })
    @Post('/ban')
    @Roles(RoleName.Admin)
    ban(@Body() banUserDto: BanUserDto) {
        return this.userService.ban(banUserDto);
    }

    @ApiOperation({ summary: 'Unban an existing user' })
    @ApiQuery({ type: BanUserDto })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK })
    @Post('/unban/:id')
    @Roles(RoleName.Admin)
    unBan(userId: string) {
        return this.userService.unBan(userId);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK })
    @Get('all')
    @UseInterceptors(ClassSerializerInterceptor)
    @Roles(RoleName.Admin)
    findAll() {
        return this.userService.findAll();
    }
}
