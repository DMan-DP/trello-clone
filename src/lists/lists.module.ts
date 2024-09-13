import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Board } from '../boards/etities/board.entity';

@Module({
    providers: [ListsService],
    controllers: [ListsController],
    imports: [TypeOrmModule.forFeature([List, Board])],
    exports: [ListsService],
})
export class ListsModule {}
