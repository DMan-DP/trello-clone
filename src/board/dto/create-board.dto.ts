import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
    @ApiProperty({ example: 'Name', description: 'Board name' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Description', description: 'Board description' })
    @IsString()
    description: string;
}
