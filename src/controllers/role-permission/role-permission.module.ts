import { Module } from "@nestjs/common";
import { RolesPermissionService } from "./role-permission.service";
import { RolesPermissionController } from "../../routes/role_permission/role_permission.controller";
import { PrismaService } from "prisma/prisma.service";

@Module({
  providers: [RolesPermissionService, PrismaService],
  controllers: [RolesPermissionController],
  exports: [RolesPermissionService],
})
export class RolePermissionModule {}
