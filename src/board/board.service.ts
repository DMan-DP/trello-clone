import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './etities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {}

    async create(createBoardDto: CreateBoardDto, userId: string) {
        return await this.boardRepository.save({
            ...createBoardDto,
            user: { id: userId },
        });
    }

    async findAll(userId: string) {
        return await this.boardRepository.find({ where: { user: { id: userId } } });
    }

    async findOne(id: string) {
        const board = await this.boardRepository.findOneBy({ id });
        if (!board) throw new NotFoundException(`Board ${id} not found`);
        return board;
    }

    async update(id: string, userId: string, updateBoardDto: UpdateBoardDto) {
        await this.isUserAssociatedWithBoard(id, userId);
        const board = await this.boardRepository.findOne({
            where: { id: id },
            relations: ['lists', 'list.cards'],
        });
        this.boardRepository.merge(board, updateBoardDto);
        return await this.boardRepository.save(board);
    }

    async delete(id: string, userId: string) {
        await this.isUserAssociatedWithBoard(id, userId);
        return await this.boardRepository.delete(id);
    }

    async isUserAssociatedWithBoard(boardId: string, userId: string) {
        const count = await this.boardRepository.count({
            where: { id: boardId, user: { id: userId } },
        });
        if (!count) throw new UnauthorizedException('User is not associated with board');
        return true;
    }
}
