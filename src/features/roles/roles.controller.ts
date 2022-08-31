import { CreateRoleDto } from '@app/dtos';
import { Role } from '@app/entities';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  public constructor(private rolesService: RolesService) {}

  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  public getRoleById(@Param('value') value: string): Promise<Role> {
    return this.rolesService.getRoleByValue(value)
  }

  @ApiResponse({ status: 201, type: [Role] })
  @Post()
  public createRole(@Body() createRoleData: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(createRoleData)
  }
}