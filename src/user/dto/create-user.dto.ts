import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'user@email.com', description: 'User email' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'a78h@E9s', description: 'Password' })
    @IsString()
    @MinLength(6, { message: 'No less than 6 characters' })
    @MaxLength(32, { message: 'No more than 32 characters' })
    readonly password: string;
}
