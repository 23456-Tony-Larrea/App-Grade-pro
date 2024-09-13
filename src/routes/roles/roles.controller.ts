// roles.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RolesService } from '../../controllers/roles/roles.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/DTO/role-dto/CreateRoleDTO';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateRoleDto })
  create(@Body() data: CreateRoleDto ) {
    return this.rolesService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: CreateRoleDto })
  update(@Param('id') id: number, @Body() data: CreateRoleDto) {
    return this.rolesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rolesService.remove(id);
  }
}