import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto {
    @ApiProperty()
    @IsString()
    title: string;
}
