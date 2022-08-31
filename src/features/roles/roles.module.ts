import { Role } from '@app/models/roles.model';
import { UserRoles } from '@app/models/user-roles.model';
import { User } from '@app/models/users.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([
    User, 
    Role, 
    UserRoles,
  ])],
  exports: [RolesService]
})
export class RolesModule {}
