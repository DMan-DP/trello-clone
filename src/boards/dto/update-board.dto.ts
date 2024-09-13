import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
    @ApiProperty({ example: 'Name', description: 'Board name' })
    @IsNotEmpty({ message: 'Project name is required' })
    @IsString({ message: 'Should be string' })
    name: string;

    @ApiProperty({ example: 'Description', description: 'Board description' })
    @IsString({ message: 'Should be string' })
    description: string;
}
