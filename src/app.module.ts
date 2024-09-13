import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { UserRole } from './roles/entities/user-role.entity';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/etities/board.entity';
import { ListsModule } from './lists/lists.module';
import { List } from './lists/entities/list.entity';
import { CardsModule } from './cards/cards.module';
import { Card } from './cards/entities/card.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.env.NODE_ENV}.env`,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            entities: [User, Role, UserRole, Board, List, Card],
            synchronize: true,
        }),
        UserModule,
        RolesModule,
        AuthModule,
        BoardsModule,
        ListsModule,
        CardsModule,
    ],
    controllers: [BoardsController],
})
export class AppModule {}
