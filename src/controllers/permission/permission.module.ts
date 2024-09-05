import { Module } from '@nestjs/common';
import { PermissionsController } from '../../routes/permissions/permissions.controller';
import { PermissionsService } from './permission.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PrismaService],
  exports: [PermissionsService]
})
export class PermissionsModule {}