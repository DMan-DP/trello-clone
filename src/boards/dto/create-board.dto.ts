import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
    @IsNotEmpty()
    @ApiProperty({ example: '68f85080-dc8c-45d7-9ef8-07a1b2da96b3', description: 'User identifier' })
    @IsString({ message: 'Should be string' })
    userId: string;

    @ApiProperty({ example: 'Name', description: 'Board name' })
    @IsNotEmpty({ message: 'Project name is required' })
    @IsString({ message: 'Should be string' })
    name: string;

    @ApiProperty({ example: 'Description', description: 'Board description' })
    @IsString({ message: 'Should be string' })
    description: string;
}
