import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "src/routes/users/users.controller";
import { PrismaService } from "prisma/prisma.service"; // Asegúrate de tener PrismaService configurado

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
