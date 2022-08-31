import { ApiProperty } from "@nestjs/swagger";

/** Create role dto. */
export class CreateRoleDto {
  /** Role value. */
  @ApiProperty({ example: 'ADMIN', description: 'Role value' })
  readonly value: string;

  /** Role description. */
  @ApiProperty({ example: 'This is admin', description: 'Description' })
  readonly description: string;
}
