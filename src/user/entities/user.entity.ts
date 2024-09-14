import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/entities/role.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Board } from '../../board/etities/board.entity';

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty({ example: '68f85080-dc8c-45d7-9ef8-07a1b2da96b3', description: 'Unique identifier' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'user@email.com', description: 'User email', uniqueItems: true })
    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @ApiProperty({ description: 'User password hash' })
    @Column({ name: 'password_hash', type: 'varchar', nullable: false })
    password: string;

    @CreateDateColumn({ name: 'created_at', update: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ApiProperty({ example: 'true', description: 'Banned or not banned' })
    @Column({ type: 'bool', default: false, nullable: false })
    banned: boolean;

    @ApiProperty({ example: 'Banned but or just...', description: 'Reason for blocking', nullable: true })
    @Column({ name: 'ban_reason', type: 'varchar', nullable: true })
    banReason: string;

    @OneToMany(() => Board, (project) => project.user, { onDelete: 'CASCADE' })
    boards: Board[];

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'user_role_user_id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'user_role_role_id',
        },
    })
    roles: Role[];
}
