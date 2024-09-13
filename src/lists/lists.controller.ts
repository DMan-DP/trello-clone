import { Body, Controller, HttpStatus, Patch, Post } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { List } from './entities/list.entity';
import { UpdateListDto } from './dto/update-list.dto';

@ApiTags('Boards')
@Controller('list')
export class ListsController {
    constructor(private readonly listService: ListsService) {}

    @ApiResponse({ status: HttpStatus.CREATED, type: List })
    @Post()
    createList(@Body() createBoardDto: CreateListDto) {
        return this.listService.createList(createBoardDto);
    }

    @ApiResponse({ status: HttpStatus.OK, type: List })
    @Patch()
    updateList(@Body() dto: UpdateListDto) {}
}
