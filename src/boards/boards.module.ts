import { forwardRef, Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './etities/board.entity';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    providers: [BoardsService],
    controllers: [BoardsController],
    imports: [TypeOrmModule.forFeature([Board, User]), forwardRef(() => AuthModule)],
    exports: [BoardsService],
})
export class BoardsModule {}
