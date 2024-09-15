import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './etities/board.entity';
import { PayloadRequest } from '../auth/requests/payload-request';

@ApiTags('Boards')
@Controller('boards')
export class BoardController {
    constructor(private readonly projectService: BoardService) {}

    @ApiOperation({ summary: 'Create board' })
    @ApiQuery({ type: CreateBoardDto })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.CREATED, type: Board })
    @Post()
    create(@Body() createBoardDto: CreateBoardDto, @Request() request) {
        return this.projectService.create(createBoardDto, request.user.id);
    }

    @ApiOperation({ summary: 'Get all boards' })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: [Board] })
    @Get()
    findAll(@Request() request) {
        return this.projectService.findAll(request.user.id);
    }

    @ApiOperation({ summary: 'Get an existing board' })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: Board })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectService.findOne(id);
    }

    @ApiOperation({ summary: 'Update an existing board' })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: Board })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateBoardDto, @Request() request: PayloadRequest) {
        return this.projectService.update(id, request.user.id, updateProjectDto);
    }

    @ApiOperation({ summary: 'Delete an existing board' })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':id')
    removeProject(@Param('id') id: string, @Request() request: PayloadRequest) {
        return this.projectService.delete(id, request.user.id);
    }
}
