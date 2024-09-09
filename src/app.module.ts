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
import { LoginRegisterService } from './controllers/auth/auth.service';
import { AuthModule } from './controllers/auth/auth.module';
import { AuthController } from './routes/auth/auth.controller';
import { DesactivateUsersService } from './controllers/auth/desactivate-users/desactivate-users.service';
import { DesactivateUsersModule } from './controllers/auth/desactivate-users/desactivate-users.module';
@Module({
  imports: [PermissionsModule, RolesModule, RolePermissionModule, AuthModule, DesactivateUsersModule],
  controllers: [AppController, PermissionsController, RolesController, RolesPermissionController, AuthController],
  providers: [AppService, PrismaService, RolesService,LoginRegisterService, DesactivateUsersService],
})
export class AppModule {}