import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './etities/board.entity';

@ApiTags('Boards')
@Controller('boards')
export class BoardController {
    constructor(private readonly projectService: BoardService) {}

    @ApiOperation({ summary: 'Create board' })
    @ApiResponse({ status: HttpStatus.CREATED, type: Board })
    @Post()
    create(@Body() createBoardDto: CreateBoardDto, @Request() request) {
        return this.projectService.create(createBoardDto, request.user.id);
    }

    @ApiOperation({ summary: 'Get all board' })
    @ApiResponse({ status: HttpStatus.OK, type: [Board] })
    @Get()
    findAll(@Request() request) {
        return this.projectService.findAll(request.user.id);
    }

    @ApiOperation({ summary: 'Get board by id' })
    @ApiResponse({ status: HttpStatus.OK, type: Board })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectService.findOne(id);
    }

    @ApiOperation({ summary: 'Update board by id' })
    @ApiResponse({ status: HttpStatus.OK, type: Board })
    @Patch(':id')
    updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateBoardDto) {
        return this.projectService.update(id, updateProjectDto);
    }

    @ApiOperation({ summary: 'Remove project by id' })
    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':id')
    removeProject(@Param('id') id: string) {
        return this.projectService.delete(id);
    }
}
