import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
    @ApiProperty()
    @IsUUID()
    listId: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsInt()
    position: number;
}
