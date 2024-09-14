import { Body, Controller, Get, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from '../decorators/public.decorator';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register new user by email and password' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User data with access token' })
    @Public()
    @Post('registration')
    async registration(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @ApiOperation({ summary: 'Login user with email and password' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User data with access token' })
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() request) {
        return this.authService.login(request.user);
    }

    @Get('profile')
    @UseGuards(LocalAuthGuard)
    async getProfile(@Request() request) {
        return request.user;
    }
}
