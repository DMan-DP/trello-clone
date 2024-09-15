import { Body, Controller, Delete, HttpStatus, Param, Patch, Post, Put, Request } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Card } from './entities/card.entity';
import { PayloadRequest } from '../auth/requests/payload-request';
import { ReorderCardDto } from './dto/reorder-card.dto';

@ApiTags('Cards')
@Controller('cards')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @ApiOperation({ summary: 'Create card' })
    @ApiQuery({ type: CreateCardDto })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.CREATED, type: Card })
    @Post()
    create(@Body() createCardDto: CreateCardDto, @Request() request: PayloadRequest) {
        return this.cardService.create(createCardDto, request.user.id);
    }

    @ApiOperation({ summary: 'Update an existing card' })
    @ApiQuery({ type: UpdateCardDto })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: Card })
    @Patch(':id')
    update(@Param('id') id: string, @Request() request: PayloadRequest, @Body() updateCardDto: UpdateCardDto) {
        return this.cardService.update(id, request.user.id, updateCardDto);
    }

    @ApiOperation({ summary: 'Reorder an existing card positions or lists' })
    @ApiQuery({ type: ReorderCardDto })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK })
    @Put('reorder')
    reorder(@Body() reorderCardDto: ReorderCardDto, @Request() request: PayloadRequest) {
        return this.cardService.reorder(reorderCardDto, request.user.id);
    }

    @ApiOperation({ summary: 'Delete an existing card' })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':id')
    remove(@Param('id') id: string, @Request() request: PayloadRequest) {
        return this.cardService.remove(id, request.user.id);
    }
}
