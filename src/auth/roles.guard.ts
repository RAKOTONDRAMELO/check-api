import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from 'src/users/enum';

interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
  // acces: boolean;
}

interface AuthenticatedUserRequest extends Request {
  user: AuthenticatedUser;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedUserRequest>();

    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Utilisateur non authentifié');
    }

    if (!requiredRoles.includes(user.role)) {
      console.log('requiredRoles:', requiredRoles);
      console.log('user.role:', user.role);
      throw new ForbiddenException('Accès refusé : rôle insuffisant');
    }
    console.log('requiredRoles:', requiredRoles);
    console.log('user.role:', user.role);
    // console.log(user.acces);

    return true;
  }
}
