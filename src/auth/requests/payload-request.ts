import { Role } from '../../roles/entities/role.entity';

export interface PayloadRequest extends Request {
    user: {
        id: string;
        roles: Role[];
    };
}
