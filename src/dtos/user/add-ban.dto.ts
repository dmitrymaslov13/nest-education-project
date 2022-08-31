import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  
  @ApiProperty({ example: '42', description: 'User id' })
  readonly userId: number

  @ApiProperty({ example: 'Did bad things', description: 'Ban reason' })
  readonly banReason: string
}
