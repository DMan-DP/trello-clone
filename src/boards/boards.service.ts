import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './etities/board.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private readonly projectRepository: Repository<Board>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createProject(dto: CreateBoardDto) {
        const user = await this.userRepository.findOneBy({ id: dto.userId });
        if (!user) {
            throw new NotFoundException(`User ${dto.userId} not found`);
        }
        const project = new Board();
        project.name = dto.name;
        project.description = dto.description;
        project.user = user;
        return await this.projectRepository.save(project);
    }

    async getAllProjects() {
        return await this.projectRepository.find();
    }

    async getProjectById(id: string) {
        const project = await this.projectRepository.findOneBy({ id });
        if (!project) {
            throw new NotFoundException(`Project with id ${id} not found`);
        }
        return project;
    }

    async getUserProjects(id: string) {
        const user = await this.userRepository.findOne({ where: { id }, relations: { boards: true } });
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
        return user.boards;
    }

    async updateProject(id: string, dto: UpdateBoardDto) {
        const project = await this.projectRepository.findOneBy({ id });
        if (!project) {
            throw new NotFoundException(`Project with id ${id} not found`);
        }
        project.name = dto.name;
        project.description = dto.description;
        return await project.save();
    }

    async removeProject(id: string) {
        const project = await this.projectRepository.findOneBy({ id });
        if (!project) {
            throw new NotFoundException(`Project with id ${id} not found`);
        }
        return await project.remove();
    }
}
