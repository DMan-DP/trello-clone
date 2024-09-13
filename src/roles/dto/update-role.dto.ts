import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRoleDto {
    @ApiProperty({ example: 'Administrator', description: 'Description roles' })
    @IsString({ message: 'Should be string' })
    readonly description: string;
}
