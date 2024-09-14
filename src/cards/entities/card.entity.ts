import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { List } from '../../lists/entities/list.entity';

@ApiTags('Cards')
@Entity('cards')
export class Card {
    @ApiProperty({ example: '68f85080-dc8c-45d7-9ef8-07a1b2da96b3', description: 'Unique identifier' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'Name', description: 'Card name' })
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @ApiProperty({ example: 'Description', description: 'Card description' })
    @Column({ type: 'varchar', nullable: true })
    description: string;

    @ApiProperty({ example: 0, description: 'Card position in board', nullable: false })
    @Column({ name: 'position', type: 'int', unique: true, nullable: false, default: 0 })
    position: number;

    @CreateDateColumn({ name: 'created_at', update: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @JoinColumn({ name: 'list_id' })
    @ManyToOne(() => List, (list) => list.cards, { onDelete: 'CASCADE' })
    list: List;
}
