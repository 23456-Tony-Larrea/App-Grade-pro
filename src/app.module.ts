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
import { WelcomeUserService } from './controllers/auth/welcome-user/welcome-user.service';
import { ForgotPasswordModule } from './controllers/auth/forgot-password/forgot-password.module';
import { ForgotPasswordController } from './routes/auth/forgot-password.controller';
import { ForgotUsernameService } from './controllers/auth/forgot-username/forgot-username.service';
import { ForgotUsernameModule } from './controllers/auth/forgot-username/forgot-username.module';
import { ForgotUsernameController } from './routes/auth/forgot-username.controller';
import { DesactivateUserFalseService } from './controllers/auth/desactivate-user-false/desactivate-user-false.service';
import { UpdatePasswordService } from './controllers/auth/update-password/update-password.service';
import { UpdatePasswordModule } from './controllers/auth/update-password/update-password.module';
import { UpdatePasswordController } from './routes/update-password/update-password.controller';
import { UsersModule } from './controllers/users/users.module';
import { UsersController } from './routes/users/users.controller';
@Module({
  imports: [PermissionsModule, RolesModule, RolePermissionModule, AuthModule ,ForgotPasswordModule, ForgotUsernameModule, UpdatePasswordModule, UsersModule],
  controllers: [AppController, PermissionsController, RolesController, RolesPermissionController, AuthController, ForgotPasswordController, ForgotUsernameController,UpdatePasswordController, UsersController],
  providers: [AppService, PrismaService, RolesService,LoginRegisterService, DesactivateUsersService, WelcomeUserService, ForgotUsernameService, DesactivateUserFalseService, UpdatePasswordService],
})
export class AppModule {}