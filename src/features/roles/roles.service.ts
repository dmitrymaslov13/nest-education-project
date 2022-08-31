import { CreateRoleDto } from '@app/dtos/role/create-role.dto';
import { Role } from '@app/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  public constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  /**
   * Create role.
   * @param roleData Role data.
   */
  public async createRole(roleData: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.create(roleData)
    return role
  }

  /**
   * Get role by id.
   * @param value Role value.
   */
  public async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({where: {value}});
    return role
  }
}
