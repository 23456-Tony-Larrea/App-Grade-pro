import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SubjectsDto } from 'src/DTO/Subjects/subjectsDTO';


export type CreateSubjectParams = Omit<SubjectsDto, 'id'>;
@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllsubject() {
    return this.prisma.subject.findMany();
  }

  async createsubject(data: CreateSubjectParams): Promise<{ message: string; subject: any }> {
    const subject = await this.prisma.subject.create({
      data,
    });
    return {
      message: 'Materia creada con éxito',
      subject,
    };
  }

  async findOnesubject(id: number) {
    return this.prisma.subject.findUnique({ where: { id } });
  }

  async updatesubject(id: number, data: CreateSubjectParams): Promise<{ message: string; subject: any }> {
    const subject = await this.prisma.subject.update({
      where: { id },
      data,
    });
    return {
      message: 'Materia actualizada con éxito',
      subject,
    };
  }

  async changeStateBoolsubject(id: number) {
    const subject = await this.prisma.subject.findFirst({
      where: {
        id,
      },
    });
    if (!subject) {
      return { message: "materia no encontrada" };
    }
    if (subject.state) {
      await this.prisma.subject.update({
        where: {
          id: subject.id,
        },
        data: {
          state: false,
        },
      });
      return { message: "materia deshabilitada con éxito" };
    } else {
      await this.prisma.subject.update({
        where: {
          id: subject.id,
        },
        data: {
          state: true,
        },
      });
      return { message: "materia habilitada con éxito" };
    }
  }
}
