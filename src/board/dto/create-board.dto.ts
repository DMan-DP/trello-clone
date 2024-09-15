import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;
}
