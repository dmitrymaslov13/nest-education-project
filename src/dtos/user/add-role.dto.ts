import { ApiProperty } from '@nestjs/swagger';

export class AddRoleToUserDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role value' })
  readonly value: string;

  @ApiProperty({ example: '42', description: 'User id' })
  readonly userId: number;
}
