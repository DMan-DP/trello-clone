import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from '../list/list.module';
import { UserModule } from '../user/user.module';
import { Card } from './entities/card.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Card]),
        ListModule,
        UserModule,
    ],
    controllers: [CardController],
    providers: [CardService],
    exports: [CardService],
})
export class CardModule {}
