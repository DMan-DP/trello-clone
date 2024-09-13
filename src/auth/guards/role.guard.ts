import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../roles-auth.decorator';
import { Role } from '../../roles/entities/role.entity';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles) {
                return true;
            }

            const authHeader = request.heareds.authorization;
            const authHeaderParams = authHeader.split(' ');
            const bearer = authHeaderParams[0];
            const token = authHeaderParams[1];

            if (bearer === 'Bearer' && token) {
                const user = this.jwtService.verify(token);
                request.user = user;
                return user.roles.some((role: Role) => requiredRoles.includes(role.role));
            }
        } catch {
            throw new HttpException('No access', HttpStatus.FORBIDDEN);
        }

        throw new UnauthorizedException({ message: 'User is not authorized' });
    }
}
