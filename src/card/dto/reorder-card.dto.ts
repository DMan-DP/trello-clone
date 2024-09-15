import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsUUID } from 'class-validator';

export class ReorderCardItemDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsInt()
    position: number;

    @ApiProperty()
    @IsUUID()
    listId: string;
}

export class ReorderCardDto {
    @ApiProperty()
    @IsUUID()
    boardId: string;

    @ApiProperty({ type: ReorderCardItemDto, isArray: true })
    @IsArray()
    cards: ReorderCardItemDto[];
}
