import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../../decorators/roles-auth.decorator';
import { Role } from '../../roles/entities/role.entity';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractBearerToken(request);
        if (!token) throw new UnauthorizedException();

        let user;
        try {
            user = this.jwtService.verify(token);
            request.user = user;
        } catch {
            throw new UnauthorizedException();
        }

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles) return true;

            return user.roles.some((role: Role) => requiredRoles.includes(role.name));
        } catch {
            throw new ForbiddenException('No access');
        }
    }

    private extractBearerToken(request: Request) {
        const authHeader = request.headers['authorization'];
        if (!authHeader) return undefined;
        const authHeaderParams = authHeader.split(' ');
        if (authHeaderParams[0] !== 'Bearer') return undefined;
        return authHeaderParams[1];
    }
}
