import { IsArray, IsInt, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReorderListDto {
    @ApiProperty()
    @IsUUID()
    boardId: string;

    @ApiProperty()
    @IsArray()
    lists: ReorderListItemDto[];
}

export class ReorderListItemDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsInt()
    position: number;
}
