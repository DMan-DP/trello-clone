import { Card } from '../entities/card.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ReorderCardDto {
    @ApiProperty()
    @IsUUID()
    boardId: string;

    @ApiProperty()
    cards: Card[];
}
