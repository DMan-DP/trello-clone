import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Board } from '../board/etities/board.entity';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([List, Board]),
        UserModule,
    ],
    providers: [ListService],
    controllers: [ListController],
    exports: [ListService],
})
export class ListModule {}
