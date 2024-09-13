import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { Board } from '../boards/etities/board.entity';

@Injectable()
export class ListsService {
    constructor(
        @InjectRepository(List)
        private readonly boardColumnRepository: Repository<List>,
        @InjectRepository(Board)
        private readonly projectRepository: Repository<Board>,
    ) {}

    async createList(dto: CreateListDto) {
        const board = await this.projectRepository.findOneBy({ id: dto.boardId });
        if (!board) {
            throw new NotFoundException(`Project ${dto.boardId} not found`);
        }
        const boardColumn = new List();
        boardColumn.name = dto.name;
        boardColumn.board = board;
        return await this.boardColumnRepository.save(boardColumn);
    }
}
