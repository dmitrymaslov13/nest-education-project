import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'Test1231', description: 'Password' })
  readonly password: string;
}
