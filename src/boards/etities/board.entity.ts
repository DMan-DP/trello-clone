import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { List } from '../../lists/entities/list.entity';
import { User } from '../../user/entities/user.entity';

@Entity('boards')
export class Board extends BaseEntity {
    @ApiProperty({ example: '9bc87264-b1ee-489f-a028-a3bf07c1f3df', description: 'Unique identifier' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'Board', description: 'boards name' })
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @ApiProperty({ example: 'Description', description: 'Board description' })
    @Column({ type: 'varchar', nullable: true })
    description: string;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @CreateDateColumn({ name: 'created_at', update: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => List, (list) => list.board, { onDelete: 'CASCADE' })
    lists: List[];
}
