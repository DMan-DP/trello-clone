import { forwardRef, Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './etities/board.entity';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    providers: [BoardService],
    controllers: [BoardController],
    imports: [TypeOrmModule.forFeature([Board, User]), forwardRef(() => AuthModule)],
    exports: [BoardService],
})
export class BoardModule {}
