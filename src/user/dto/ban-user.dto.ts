import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
    @ApiProperty({ description: 'User id' })
    @IsUUID()
    readonly id: string;

    @ApiProperty({ description: 'Ban reason' })
    @IsString()
    readonly banReason: string;
}
