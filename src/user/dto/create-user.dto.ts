import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'user@email.com' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'a78h@E9s' })
    @IsString()
    @MinLength(6)
    @MaxLength(32)
    readonly password: string;
}
