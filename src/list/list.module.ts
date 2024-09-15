import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Board } from '../board/etities/board.entity';

@Module({
    providers: [ListService],
    controllers: [ListController],
    imports: [TypeOrmModule.forFeature([List, Board])],
    exports: [ListService],
})
export class ListModule {}
