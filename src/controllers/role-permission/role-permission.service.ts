import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RolesPermissionService {
    constructor(private prismaService: PrismaService ) {}    
    async findWithJoin(roleId:number) {
        return this.prismaService.permissionRole.findMany({
            where:{
                roleId:roleId
            },
            include:{
                role:true,
                permission:true
            },
    });
    }
    async updateState(roleId: number, permissionId: number, newState: boolean) {
        const role_permission = await this.prismaService.permissionRole.findFirst({
            where: {
                roleId,
                permissionId,
            },
        })
        if(!role_permission){
            return { message: 'Role permission not found' };
        }
        role_permission.state=newState;
        await this.prismaService.permissionRole.update({
            where: {
                id: role_permission.id,
            },
            data: {
                state: newState,
            },
        });
        return { message: 'El permiso del rol ha sido actualizado con exito' };
    }
}