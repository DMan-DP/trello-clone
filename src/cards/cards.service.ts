import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
    create(createCardDto: CreateCardDto) {
        return 'This action adds a new cards';
    }

    findAll() {
        return `This action returns all card`;
    }

    findOne(id: number) {
        return `This action returns a #${id} card`;
    }

    update(id: number, updateCardDto: UpdateCardDto) {
        return `This action updates a #${id} card`;
    }

    remove(id: number) {
        return `This action removes a #${id} card`;
    }
}
