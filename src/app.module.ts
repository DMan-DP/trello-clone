import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { ListModule } from './list/list.module';
import { BoardModule } from './board/board.module';
import { CardModule } from './card/card.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { UserRole } from './roles/entities/user-role.entity';
import { Board } from './board/etities/board.entity';
import { List } from './list/entities/list.entity';
import { Card } from './card/entities/card.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';

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
        RolesModule,
        UserModule,
        BoardModule,
        ListModule,
        CardModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
