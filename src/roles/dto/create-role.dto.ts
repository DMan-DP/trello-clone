import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { RoleName } from '../enums/role-name';

export class CreateRoleDto {
    @IsEnum(RoleName)
    @ApiProperty({ example: RoleName.User, description: 'Unique value roles', enum: RoleName })
    readonly name: RoleName;

    @ApiProperty({ example: 'administrator', description: 'Description roles' })
    @IsString({ message: 'Should be string' })
    readonly description: string;
}
