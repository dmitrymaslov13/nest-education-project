import { CreateUserDto } from '@app/dtos';
import { User } from '@app/models';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  public constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, type: [User] })
  @Post()
  public createUser(@Body() createUserData: CreateUserDto) {
    return this.usersService.createUser(createUserData);
  }

  @ApiResponse({ status: 201, type: [User] })
  @Get()
  public async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
