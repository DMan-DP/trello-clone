import { Body, Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from '../decorators/public.decorator';
import { PayloadRequest } from './requests/payload-request';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register new user by email and password' })
    @ApiQuery({ type: CreateUserDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Access token' })
    @Post('registration')
    @Public()
    async registration(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @ApiOperation({ summary: 'Login user with email and password' })
    @ApiQuery({ type: CreateUserDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Access token' })
    @Post('login')
    @Public()
    @UseGuards(LocalAuthGuard)
    async login(@Request() request: PayloadRequest) {
        return this.authService.login(request.user.id);
    }
}
