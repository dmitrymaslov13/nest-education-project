import { ROLES_KEY } from "@app/decorators/roles-auth.decorator";
import { Role, User } from "@app/entities";
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from '@nestjs/jwt'
import { Observable } from "rxjs";

const ACCESS_ERROR = new HttpException('Access id denied', HttpStatus.FORBIDDEN)

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ])

      if (requiredRoles == null || requiredRoles[0] == null) {
        return true;
      }

      const req = context.switchToHttp().getRequest()
      const authHeader: string = req.headers.authorization
      const [bearer, token] = authHeader.split(' ')

      if (bearer !== 'Bearer' || token == null) {
        throw new UnauthorizedException({
          message: 'User not authorized'
        })
      }
      
      const user = this.jwtService.verify(token) as User;
      req.user = user;
      
      if (user.roles.some(role => requiredRoles.includes(role.value))) {
        return true
      }

      throw ACCESS_ERROR
    } catch (e) {
      throw ACCESS_ERROR
    }
  }
}
