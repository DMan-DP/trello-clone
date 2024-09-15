import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { UpdateListDto } from './dto/update-list.dto';
import { ReorderListDto } from './dto/reorder-list.dto';
import { BoardService } from '../board/board.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(List)
        private readonly listRepository: Repository<List>,
        private readonly boardService: BoardService,
        //private readonly userService: UserService,
    ) {}

    async create(createListDto: CreateListDto, userId: string) {
        //await this.userService.isConnectedToBoard(userId, createListDto.boardId);
        await this.boardService.isUserAssociatedWithBoard(createListDto.boardId, userId);
        const { title, position, boardId } = createListDto;

        return await this.listRepository.save({
            title,
            position,
            board: { id: boardId },
        });
    }

    async findAll(boardId: string, userId: string) {
        //await this.userService.isConnectedToBoard(userId, boardId);
        await this.boardService.isUserAssociatedWithBoard(boardId, userId);
        return await this.listRepository.findOne({
            where: { board: { id: boardId } },
            relations: { cards: true },
        });
    }

    async update(id: string, userId: string, updateListDto: UpdateListDto) {
        //await this.userService.isConnectedToList(userId, id);
        await this.isUserAssociatedWithList(id, userId);
        return await this.listRepository.update(id, updateListDto);
    }

    async reorder(userId: string, reorderListDto: ReorderListDto) {
        //await this.userService.isConnectedToBoard(userId, reorderListDto.boardId);
        await this.boardService.isUserAssociatedWithBoard(reorderListDto.boardId, userId);

        const promises = reorderListDto.lists.map(async (listItem: List) => {
            const list = await this.listRepository.findOneBy({
                id: listItem.id,
                board: { id: reorderListDto.boardId },
            });
            if (!list) throw new NotFoundException(`List ${reorderListDto.boardId} not found`);
            await this.listRepository.update(listItem.id, { position: listItem.position });
        });

        await Promise.all(promises);
        return true;
    }

    async delete(id: string, userId: string) {
        //await this.userService.isConnectedToList(userId, id);
        await this.isUserAssociatedWithList(id, userId);
        return await this.listRepository.delete(id);
    }

    async isUserAssociatedWithList(listId: string, userId: string) {
        const count = await this.listRepository.count({
            where: {
                id: listId,
                board: { user: { id: userId } },
            },
        });

        if (!count) throw new UnauthorizedException('User is not associated with list');
        return true;
    }

    async hasAccessToList(listId: string, userId: string) {
        const hasAccess = await this.listRepository.count({
            where: {
                id: listId,
                board: { user: { id: userId } },
            },
        });

        return hasAccess > 0;
    }
}
