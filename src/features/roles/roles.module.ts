import { Role, User, UserRoles } from '@app/entities';
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
