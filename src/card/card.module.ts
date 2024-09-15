import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from '../list/list.module';
import { Card } from './entities/card.entity';
import { BoardModule } from '../board/board.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Card]),
        BoardModule,
        ListModule,
    ],
    controllers: [CardController],
    providers: [CardService],
    exports: [CardService],
})
export class CardModule {}
