import { Module } from "@nestjs/common";
import { ForgotPasswordService } from "./forgot-password.service";
import { PrismaService } from "prisma/prisma.service";
import { ForgotPasswordController } from "src/routes/auth/forgot-password.controller";

@Module({
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, PrismaService],
  exports: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
