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
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoleDto } from './dto/user-role.dto';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { BanUserDto } from './dto/ban-user.dto';
import { RoleName } from '../roles/enums/role-name';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { PayloadRequest } from '../auth/requests/payload-request';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: HttpStatus.OK })
    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    findOne(@Request() request: PayloadRequest) {
        return this.userService.findOne(request.user.id);
    }

    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: HttpStatus.OK })
    @Patch()
    update(@Request() request: PayloadRequest, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(request.user.id, updateUserDto);
    }

    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: HttpStatus.OK })
    @Delete()
    delete(@Request() request: PayloadRequest) {
        return this.userService.delete(request.user.id);
    }

    @ApiOperation({ summary: 'Add roles for user' })
    @ApiResponse({ status: HttpStatus.OK })
    @Post('role')
    @Roles(RoleName.Admin)
    addRole(@Body() addRoleDto: UserRoleDto) {
        return this.userService.addRole(addRoleDto);
    }

    @ApiOperation({ summary: 'Delete roles for user' })
    @ApiResponse({ status: HttpStatus.OK })
    @Delete('role')
    @Roles(RoleName.Admin)
    removeRole(removeRoleDto: UserRoleDto) {
        return this.userService.removeRole(removeRoleDto);
    }

    @ApiOperation({ summary: 'Ban user' })
    @ApiResponse({ status: HttpStatus.OK })
    @Post('/ban')
    @Roles(RoleName.Admin)
    ban(@Body() banUserDto: BanUserDto) {
        return this.userService.ban(banUserDto);
    }
    @ApiOperation({ summary: 'Unban user' })
    @ApiResponse({ status: HttpStatus.OK })
    @Post('/unban')
    @Roles(RoleName.Admin)
    unBan(@Body() banUserDto: BanUserDto) {
        return this.userService.unBan(banUserDto);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: HttpStatus.OK })
    @Get('all')
    @UseInterceptors(ClassSerializerInterceptor)
    @Roles(RoleName.Admin)
    findAll() {
        return this.userService.findAll();
    }
}
