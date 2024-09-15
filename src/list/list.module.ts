import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Board } from '../board/etities/board.entity';
import { BoardModule } from '../board/board.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([List, Board]),
        BoardModule,
    ],
    providers: [ListService],
    controllers: [ListController],
    exports: [ListService],
})
export class ListModule {}
