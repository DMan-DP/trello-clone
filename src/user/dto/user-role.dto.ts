import { IsString, IsUUID } from 'class-validator';
import { RoleName } from '../../roles/enums/role-name';
import { ApiProperty } from '@nestjs/swagger';

export class UserRoleDto {
    @ApiProperty()
    @IsUUID()
    readonly id: string;

    @ApiProperty({ example: RoleName.Admin })
    @IsString()
    readonly roleName: string;
}
