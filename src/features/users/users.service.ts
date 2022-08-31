import { CreateUserDto } from '@app/dtos';
import { User } from '@app/models';
import { RolesService } from '@app/features/roles/roles.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  public constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);

    const role = await this.roleService.getRoleByValue('USER')
    await user.$set('roles', [role.id])
    user.roles = [role]

    return user
  }

  public async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true}});
    return users;
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true }
    })
    return user
  }
}
