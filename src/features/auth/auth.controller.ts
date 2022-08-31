import { CreateUserDto } from '@app/dtos';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

  public constructor(private authService: AuthService) {}

  /** Login. */
  @Post('/login')
  public login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  /** Registration. */
  @Post('/registration')
  public registration(@Body() registrationDto: CreateUserDto) {
    return this.authService.registration(registrationDto);
  }
}
