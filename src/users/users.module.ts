
import { Role, User, UserRoles } from '@app/models';
import { RolesModule } from '@app/roles/roles.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([
    User, 
    Role, 
    UserRoles,
  ]), 
  RolesModule],
})
export class UsersModule {}
