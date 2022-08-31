import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRoles } from './user-roles.entity';
import { User } from './users.entity';


interface RolesCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'role' })
export class Role extends Model<Role, RolesCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique id ' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'user role' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @ApiProperty({ example: 'Bla-bla-bla', description: 'role description' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  user: User[];
}
