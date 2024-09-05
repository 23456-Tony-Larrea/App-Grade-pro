import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.permission.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.role.findUnique({ where: { id } });
  }

  async create(data: any) {
    await this.prismaService.permission.create({ data });
    return { message: 'Permission created successfully'};
  }
}