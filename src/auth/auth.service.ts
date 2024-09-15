import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);
        if (user) {
            const passwordIsMatch = await argon2.verify(user.password, password);
            if (passwordIsMatch) return user;
        }
        return null;
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto);
        return this.generateToken(user);
    }

    async login(id: string) {
        const user = await this.userService.findOne(id);
        return this.generateToken(user);
    }

    private generateToken(user: User) {
        return {
            access_token: this.jwtService.sign({ id: user.id, roles: user.roles }),
        };
    }
}
