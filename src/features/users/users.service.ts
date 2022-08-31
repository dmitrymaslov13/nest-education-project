import { BanUserDto, CreateUserDto, AddRoleToUserDto } from '@app/dtos';
import { User } from '@app/entities';
import { RolesService } from '@app/features/roles/roles.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

const USER_NOT_FOUNDED_ERROR = new HttpException('User not founded', HttpStatus.NOT_FOUND)

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

  public async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id)    
    return user
  }

  public async addRoleToUser(dto: AddRoleToUserDto) {
    const user = await this.getUserById(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)


    if (user == null) {
      throw USER_NOT_FOUNDED_ERROR
    }

    if (role == null) {
      throw new HttpException('Role not founded', HttpStatus.NOT_FOUND)
    }

    await user.$add('roles', role.id)
    return dto
  }

  public async banUser(dto: BanUserDto) {
    const user = await this.getUserById(dto.userId)

    if (user == null) {
      throw USER_NOT_FOUNDED_ERROR
    }

    user.banned = true
    user.banReason = dto.banReason

    await user.save()
    return user
  }
}
