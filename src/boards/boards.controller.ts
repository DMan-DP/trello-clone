import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './etities/board.entity';
import { Roles } from '../auth/roles-auth.decorator';
import { RoleEnum } from '../roles/enums/role.enum';
import { RoleGuard } from '../auth/guards/role.guard';

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {
    constructor(private readonly projectService: BoardsService) {}

    @ApiOperation({ summary: 'Create boards' })
    @ApiResponse({ status: HttpStatus.CREATED, type: Board })
    @Post()
    createProject(@Body() dto: CreateBoardDto) {
        return this.projectService.createProject(dto);
    }

    @ApiOperation({ summary: 'Get all boards' })
    @ApiResponse({ status: HttpStatus.OK, type: [Board] })
    @Roles(RoleEnum.Admin)
    @UseGuards(RoleGuard)
    @Get()
    getAllProjects() {
        return this.projectService.getAllProjects();
    }

    @ApiOperation({ summary: 'Get boards by id' })
    @ApiResponse({ status: HttpStatus.OK, type: Board })
    @Get(':id')
    getProjectById(@Param('id') id: string) {
        return this.projectService.getProjectById(id);
    }

    @ApiOperation({ summary: 'Get user boards by user id' })
    @ApiResponse({ status: HttpStatus.OK, type: [Board] })
    @Get('user/:id')
    getUserProjects(@Param('id') id: string) {
        return this.projectService.getUserProjects(id);
    }

    @ApiOperation({ summary: 'Update boards by id' })
    @ApiResponse({ status: HttpStatus.OK, type: Board })
    @Patch(':id')
    updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateBoardDto) {
        return this.projectService.updateProject(id, updateProjectDto);
    }

    @ApiOperation({ summary: 'Remove project by id' })
    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':id')
    removeProject(@Param('id') id: string) {
        return this.projectService.removeProject(id);
    }
}
