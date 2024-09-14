import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { RoleName } from '../enums/role-name';

@Entity('roles')
export class Role {
    @ApiProperty({ example: '0', description: 'Role unique identifier' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: RoleName.User, description: 'Unique value roles', nullable: false, uniqueItems: true })
    @Column({ type: 'enum', enum: RoleName, nullable: false, unique: true })
    name: RoleName;

    @ApiProperty({ example: 'Administrator', description: 'Description roles', nullable: false })
    @Column({ type: 'varchar', nullable: false })
    description: string;

    @CreateDateColumn({ name: 'created_at', update: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'user_role_role_id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'user_role_user_id',
        },
    })
    users?: User[];
}
