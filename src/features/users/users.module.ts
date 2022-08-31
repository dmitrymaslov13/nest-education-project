
import { Role, User, UserRoles } from '@app/models';
import { RolesModule } from '@app/features/roles/roles.module';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User, 
      Role, 
      UserRoles,
    ]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}
