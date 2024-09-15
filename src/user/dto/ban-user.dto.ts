import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
    @ApiProperty()
    @IsUUID()
    readonly id: string;

    @ApiProperty()
    @IsString()
    readonly banReason: string;
}
