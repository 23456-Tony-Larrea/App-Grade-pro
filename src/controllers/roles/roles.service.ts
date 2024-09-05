import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RolesService {
    constructor(private prismaService: PrismaService ) {}
    
    async findAll() {
        return this.prismaService.role.findMany();
    }
    
    async findOne(id: number) {
        return this.prismaService.role.findUnique({ where: { id } });
    }
    
    async create(data: any) {
        const newRole= await this.prismaService.role.create({ data });
        const permisions= await this.prismaService.permission.findMany();
        const rolePermissions=[];
        for (const permission of permisions) {
            rolePermissions.push({
                permissionId: permission.id,
                roleId: newRole.id,
                state:true
            });
        }
        await this.prismaService.permissionRole.createMany({ data: rolePermissions });
        return { message: 'Role created successfully' };
    }
    
    async update(id: number, data: any) {
        await this.prismaService.role.update({ where: { id }, data });
        return { message: 'Role updated successfully' };
    }
    
    async remove(id: number) {
        await this.prismaService.permissionRole.deleteMany({ where: { roleId: id } });
        await this.prismaService.role.delete({ where: { id } });
        return { message: 'Role removed successfully' };
        }
}