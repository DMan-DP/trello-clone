import { IsArray, IsInt, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReorderListItemDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsInt()
    position: number;
}

export class ReorderListDto {
    @ApiProperty()
    @IsUUID()
    boardId: string;

    @ApiProperty({ type: ReorderListItemDto, isArray: true })
    @IsArray()
    lists: ReorderListItemDto[];
}
