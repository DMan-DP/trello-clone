import { Entity, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity('user_roles')
export class UserRole {
    @PrimaryColumn({ type: 'uuid', name: 'user_id' })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    userId: string;

    @PrimaryColumn({ type: 'int', name: 'role_id' })
    @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
    roleId: number;
}
