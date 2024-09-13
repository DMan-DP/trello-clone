import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email);
        const passwordIsMatch = await bcrypt.compare(password, user.passwordHash);
        if (user && passwordIsMatch) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Uncorrected email or password' });
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto.email, userDto.password);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword });
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles,
        };

        return {
            token: this.jwtService.sign(payload),
        };
    }
}
