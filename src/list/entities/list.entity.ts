import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Board } from '../../board/etities/board.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Card } from '../../card/entities/card.entity';

@Entity('lists')
export class List {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'Title', description: 'List name' })
    @Column({ type: 'varchar', nullable: false })
    title: string;

    @ApiProperty({ example: 0, description: 'List position on a board' })
    @Column({ type: 'int', unique: true, nullable: false })
    position: number;

    @CreateDateColumn({ name: 'created_at', update: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @JoinColumn({ name: 'board_id' })
    @ManyToOne(() => Board, (board) => board.lists)
    board: Board;

    @OneToMany(() => Card, (card) => card.list, { onDelete: 'CASCADE' })
    cards: Card[];
}
