import { Injectable, NotFoundException } from '@nestjs/common';
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
        const board = await this.boardRepository.findOne({
            where: { id: id },
            relations: ['lists', 'lists.cards'],
        });
        if (!board) {
            throw new NotFoundException(`Project with id ${id} not found`);
        }
        return board;
    }

    async update(id: string, updateBoardDto: UpdateBoardDto) {
        const existBoard = await this.boardRepository.findOneBy({ id });
        if (!existBoard) {
            throw new NotFoundException(`Board ${id} not found`);
        }
        this.boardRepository.merge(existBoard, updateBoardDto);
        return await this.boardRepository.save(existBoard);
    }

    async delete(id: string) {
        const board = await this.boardRepository.findOneBy({ id });
        if (!board) {
            throw new NotFoundException(`Project with id ${id} not found`);
        }
        return await this.boardRepository.remove(board);
    }
}
