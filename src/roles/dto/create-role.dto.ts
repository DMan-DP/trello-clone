import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { RoleEnum } from '../enums/role.enum';

export class CreateRoleDto {
    @IsString({ message: 'Should be string' })
    @ApiProperty({ example: RoleEnum.User, description: 'Unique value roles' })
    readonly value: RoleEnum;

    @ApiProperty({ example: 'administrator', description: 'Description roles' })
    @IsString({ message: 'Should be string' })
    readonly description: string;
}
