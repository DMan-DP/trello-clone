import { CreateRoleDto } from '../dto/create-role.dto';

export enum RoleName {
    User = 'user',
    Admin = 'admin',
}

export const baseCreatedRoles: CreateRoleDto[] = [
    { name: RoleName.User, description: 'Base user role' },
    { name: RoleName.Admin, description: 'Administrator' },
];
