import { Module } from "@nestjs/common";
import { ForgotUsernameController } from "src/routes/auth/forgot-username.controller";
import { ForgotPasswordService } from "../forgot-password/forgot-password.service";
import { PrismaService } from "prisma/prisma.service";

@Module({})
export class ForgotUsernameModule {
  controllers: [ForgotUsernameController];
  providers: [ForgotPasswordService, PrismaService];
  exports: [ForgotPasswordService];
}
