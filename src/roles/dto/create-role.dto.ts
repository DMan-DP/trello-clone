import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { RoleName } from '../enums/role-name';

export class CreateRoleDto {
    @ApiProperty({ example: RoleName.User, enum: RoleName })
    @IsEnum(RoleName)
    readonly name: RoleName;

    @ApiProperty()
    @IsString()
    readonly description: string;
}
