import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { UpdateListDto } from './dto/update-list.dto';
import { ReorderListDto } from './dto/reorder-list.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(List)
        private readonly listRepository: Repository<List>,
        private readonly userService: UserService
    ) {}

    async create(createListDto: CreateListDto, userId: string) {
        await this.userService.isConnectedToBoard(userId, createListDto.boardId);
        const { title, position, boardId } = createListDto;

        return await this.listRepository.save({
            title,
            position,
            board: { id: boardId },
        });
    }

    async findAll(boardId: string, userId: string) {
        await this.userService.isConnectedToBoard(userId, boardId);
        return await this.listRepository.findOne({
            where: { board: { id: boardId } },
            relations: { cards: true },
        });
    }

    async update(id: string, userId: string, updateListDto: UpdateListDto) {
        await this.userService.isConnectedToList(userId, id);
        return await this.listRepository.update(id, updateListDto);
    }

    async reorder(userId: string, reorderListDto: ReorderListDto) {
        await this.userService.isConnectedToBoard(userId, reorderListDto.boardId);
        const promises = reorderListDto.lists.map(async (list) => {
            const existList = await this.listRepository.findOneBy({
                id: list.id,
                board: { id: reorderListDto.boardId },
            });
            if (!existList) throw new NotFoundException(`List ${reorderListDto.boardId} not found`);
            await this.listRepository.update(list.id, { position: list.position });
        });

        await Promise.all(promises);
        return true;
    }

    async delete(id: string, userId: string) {
        await this.userService.isConnectedToList(userId, id);
        return await this.listRepository.delete(id);
    }
}
