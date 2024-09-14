import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
    @ApiProperty({ description: 'User id' })
    @IsUUID(undefined, { message: 'User id should be uuid' })
    readonly id: string;

    @ApiProperty({ description: 'Ban reason' })
    @IsString({ message: 'Should be string' })
    readonly banReason: string;
}
