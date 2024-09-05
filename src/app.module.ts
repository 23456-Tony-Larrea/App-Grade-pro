import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionsModule } from './controllers/permission/permission.module';
import { PermissionsController } from './routes/permissions/permissions.controller';
import { RolesService } from './controllers/roles/roles.service';
import { RolesModule } from './controllers/roles/roles.module';
import { RolesController } from './routes/roles/roles.controller';
import { RolePermissionModule } from './controllers/role-permission/role-permission.module';
import { RolesPermissionController } from './routes/role_permission/role_permission.controller';
import { AuthService } from './controllers/auth/auth.service';
import { AuthModule } from './controllers/auth/auth.module';
@Module({
  imports: [PermissionsModule, RolesModule, RolePermissionModule, AuthModule],
  controllers: [AppController, PermissionsController, RolesController, RolesPermissionController],
  providers: [AppService, PrismaService, RolesService, AuthService ],
})
export class AppModule {}