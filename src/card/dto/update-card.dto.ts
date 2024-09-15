import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateCardDto extends PartialType(
    OmitType(CreateCardDto, ['listId', 'position'] as const),
) {}
