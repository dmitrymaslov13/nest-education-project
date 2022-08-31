import { CreateUserDto } from '@app/dtos';
import { User } from '@app/models';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  public constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user)
  }

  public async registration(registrationDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(
      registrationDto.email,
    );
    
    if (candidate != null) {
      throw new HttpException(
        'User with this email address already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(registrationDto.password, 5);

    const user = await this.userService.createUser({
      ...registrationDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    return {
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
        roles: user.roles,
      }),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user != null && passwordEquals) {
      return user
    }

    throw new UnauthorizedException({
      message: 'Incorrect username or password'
    })
  }
}
