import { IsString, IsUUID } from 'class-validator';
import { RoleEnum } from '../../roles/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
    @ApiProperty({ type: 'uuid' })
    @IsUUID(undefined, { message: 'User id should be a uuid' })
    readonly userId: string;

    @ApiProperty()
    @IsString({ message: 'Role value should be string' })
    readonly roleValue: RoleEnum;
}
