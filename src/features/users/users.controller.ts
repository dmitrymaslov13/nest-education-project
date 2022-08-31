import { Roles } from '@app/decorators/roles-auth.decorator';
import { CreateUserDto } from '@app/dtos';
import { BanUserDto } from '@app/dtos/user/add-ban.dto';
import { AddRoleToUserDto } from '@app/dtos/user/add-role.dto';
import { JwtAuthGuard } from '@app/guards/jwt-auth.guard';
import { RolesGuard } from '@app/guards/roles.guard';
import { User } from '@app/models';
import { Body, Controller, Get, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  public constructor(private usersService: UsersService) {}
  
  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Roles('ADMIN', 'USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  public async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: 'Add role to user'})
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/role')
  public async addRoleToUser(@Body() addRoleDto: AddRoleToUserDto) {
    return this.usersService.addRoleToUser(addRoleDto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/ban')
  public async banUser(@Body() addBanDto: BanUserDto) {
    return this.usersService.banUser(addBanDto)
  }
}
