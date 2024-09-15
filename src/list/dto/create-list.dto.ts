import { IsInt, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
    @ApiProperty()
    @IsUUID()
    boardId: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsInt()
    position: number;
}
