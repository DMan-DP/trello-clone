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
import { List } from '../../list/entities/list.entity';

@ApiTags('Cards')
@Entity('cards')
export class Card {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'Title', description: 'Card name' })
    @Column({ type: 'varchar', nullable: false })
    title: string;

    @ApiProperty({ example: 'Description', description: 'Card content' })
    @Column({ type: 'varchar', nullable: true })
    content: string;

    @ApiProperty({ example: 0, description: 'Card position in board' })
    @Column({ name: 'position', type: 'int', unique: true, nullable: false })
    position: number;

    @CreateDateColumn({ name: 'created_at', update: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @JoinColumn({ name: 'list_id' })
    @ManyToOne(() => List, (list) => list.cards, { onDelete: 'CASCADE' })
    list: List;
}
