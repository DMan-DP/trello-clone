import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, Controller, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register new user with email and password' })
    @ApiResponse({ status: HttpStatus.OK, type: String, description: 'User authentication token' })
    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @ApiOperation({ summary: 'Login user with email and password' })
    @ApiResponse({ status: HttpStatus.OK, type: String, description: 'User authentication token' })
    @UsePipes(ValidationPipe)
    @Post('/login')
    @Post()
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    // TODO: Refresh tokens

    // TODO: Change password

    // TODO: Forgot password

    // TODO: Reset password
}
