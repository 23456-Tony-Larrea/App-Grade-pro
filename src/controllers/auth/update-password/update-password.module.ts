import { Module } from '@nestjs/common';
import { UpdatePasswordService } from './update-password.service';
import { UpdatePasswordController } from 'src/routes/update-password/update-password.controller';
import { PrismaService } from 'prisma/prisma.service'; // Asegúrate de tener PrismaService configurado

@Module({
  controllers: [UpdatePasswordController],
  providers: [UpdatePasswordService, PrismaService],
})
export class UpdatePasswordModule {}