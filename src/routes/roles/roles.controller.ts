import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RolesService } from '../../controllers/roles/roles.service';

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
    create(@Body() data: any) {
        return this.rolesService.create(data);
    }
    
    @Put(':id')
    update(@Param('id') id: number, @Body() data: any) {
        return this.rolesService.update(id, data);
    }
    
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.rolesService.remove(id);
    }
}