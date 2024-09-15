import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { ListService } from '../list/list.service';
import { ReorderCardDto } from './dto/reorder-card.dto';
import { BoardService } from '../board/board.service';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card>,
        private readonly boardService: BoardService,
        private readonly listService: ListService,
    ) {}

    async create(createCardDto: CreateCardDto, userId: string) {
        await this.listService.isUserAssociatedWithList(createCardDto.listId, userId);
        const { title, content, position, listId } = createCardDto;
        return await this.cardRepository.save({
            title,
            content,
            position,
            list: { id: listId },
        });
    }

    async update(id: string, userId: string, updateCardDto: UpdateCardDto) {
        await this.isUserAssociatedWithCard(id, userId);
        return await this.cardRepository.update(id, updateCardDto);
    }

    async reorder(reorderCardDto: ReorderCardDto, userId: string) {
        await this.boardService.isUserAssociatedWithBoard(reorderCardDto.boardId, userId);

        const promises = reorderCardDto.cards.map(async (cardItem: Card) => {
            const card = await this.cardRepository.findOneBy({ id: cardItem.id });
            if (!card) throw new NotFoundException(`Card ${cardItem.id} not found`);
            await this.cardRepository.update(cardItem.id, {
                position: cardItem.position,
                list: { id: cardItem.list.id },
            });
        });

        await Promise.all(promises);
        return true;
    }

    async remove(id: string, userId: string) {
        await this.isUserAssociatedWithCard(id, userId);
        return await this.cardRepository.delete(id);
    }

    async isUserAssociatedWithCard(cardId: string, userId: string) {
        const count = this.cardRepository.count({
            where: {
                id: cardId,
                list: { board: { user: { id: userId } } },
            },
        });

        if (!count) throw new UnauthorizedException('User is not associated with card');
        return true;
    }
}
