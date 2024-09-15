import { IsEnum, IsUUID } from 'class-validator';
import { RoleName } from '../../roles/enums/role-name';
import { ApiProperty } from '@nestjs/swagger';

export class UserRoleDto {
    @ApiProperty({ description: 'User id' })
    @IsUUID()
    readonly id: string;

    @ApiProperty({ description: 'Role name', example: RoleName.Admin })
    @IsEnum({ enum: RoleName })
    readonly roleName: RoleName;
}
