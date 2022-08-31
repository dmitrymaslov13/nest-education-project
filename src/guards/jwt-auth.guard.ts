import { User } from "@app/models";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
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
      
      return true;

    } catch (e) {
      throw new UnauthorizedException({
        message: 'User not authorized'
      })
    }
  }
}