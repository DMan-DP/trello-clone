import { IsInt, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
    @ApiProperty({ description: 'Board id' })
    @IsUUID()
    boardId: string;

    @ApiProperty({ description: 'Title' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Position' })
    @IsInt()
    position: number;
}
