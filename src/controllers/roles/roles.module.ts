import { Module } from "@nestjs/common";
import { RolesController } from "../../routes/roles/roles.controller";
import { RolesService } from "./roles.service";
import { PrismaService } from "../../../prisma/prisma.service"; // Asegúrate de importar PrismaService correctamente

@Module({
  controllers: [RolesController],
  providers: [RolesService, PrismaService],
})
export class RolesModule {}
