import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Request } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { List } from './entities/list.entity';
import { UpdateListDto } from './dto/update-list.dto';
import { ReorderListDto } from './dto/reorder-list.dto';
import { PayloadRequest } from '../auth/requests/payload-request';

@ApiTags('Boards')
@Controller('lists')
export class ListController {
    constructor(private readonly listService: ListService) {}

    @ApiOperation({ summary: 'Create list' })
    @ApiResponse({ status: HttpStatus.CREATED, type: List })
    @Post()
    create(@Body() createBoardDto: CreateListDto, @Request() request: PayloadRequest) {
        return this.listService.create(createBoardDto, request.user.id);
    }

    @ApiOperation({ summary: 'Get all lists by board id' })
    @ApiResponse({ status: HttpStatus.OK, type: [List] })
    @Get('board/:id')
    findAll(@Param('id') boardId: string, @Request() request: PayloadRequest) {
        return this.listService.findAll(boardId, request.user.id);
    }

    @ApiOperation({ summary: 'Update an existing list' })
    @ApiResponse({ status: HttpStatus.OK, type: List })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateListDto: UpdateListDto, @Request() request: PayloadRequest) {
        return this.listService.update(id, request.user.id, updateListDto);
    }

    @ApiOperation({ summary: 'Update list position' })
    @ApiResponse({ status: HttpStatus.OK })
    @Put('reorder')
    reorder(@Body() reorderListDto: ReorderListDto, @Request() request: PayloadRequest) {
        return this.listService.reorder(request.user.id, reorderListDto);
    }

    @ApiOperation({ summary: 'Delete a list' })
    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':id')
    delete(@Param('id') id: string, @Request() request: PayloadRequest) {
        return this.listService.delete(id, request.user.id);
    }
}
