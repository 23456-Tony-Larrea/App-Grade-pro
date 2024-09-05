import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PermissionsService } from '../../controllers/permission/permission.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Post()
  create(@Body() createPermissionDto: any) {
    return this.permissionsService.create(createPermissionDto);
  }
}