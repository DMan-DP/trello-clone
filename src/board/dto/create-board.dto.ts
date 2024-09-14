import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
    @ApiProperty({ example: 'Name', description: 'Board name' })
    @IsString({ message: 'Board name Should be string' })
    name: string;

    @ApiProperty({ example: 'Description', description: 'Board description' })
    @IsString({ message: 'Board name should be string' })
    description: string;
}
