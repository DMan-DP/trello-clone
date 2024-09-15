import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './etities/board.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board, User]),
        UserModule,
    ],
    providers: [BoardService],
    controllers: [BoardController],
    exports: [BoardService],
})
export class BoardModule {}
