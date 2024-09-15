import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto {
    @ApiProperty({ description: 'Title' })
    @IsString()
    title: string;
}
