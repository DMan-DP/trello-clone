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
import { ROLES_KEY } from '../../decorators/roles-auth.decorator';
import { Role } from '../../roles/entities/role.entity';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class JwtRoleAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

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
                return user.roles.some((role: Role) => requiredRoles.includes(role.name));
            }
        } catch {
            throw new HttpException('No access', HttpStatus.FORBIDDEN);
        }

        throw new UnauthorizedException({ message: 'Unauthorized' });
    }
}
