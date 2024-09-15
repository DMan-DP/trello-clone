import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
    @ApiProperty({ description: 'List id' })
    @IsUUID()
    listId: string;

    @ApiProperty({ description: 'Title' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Content' })
    @IsString()
    content: string;

    @ApiProperty({ description: 'Position' })
    @IsInt()
    position: number;
}
