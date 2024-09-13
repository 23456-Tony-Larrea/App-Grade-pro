import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class SubjectsService {
  /* constructor(private readonly prisma: PrismaService) {} */
  /*   async findAllSubjects() {
    return this.prisma.subject.findMany();
  }
  async createSubjects(data: CreateSubjectsParams) {
    return this.prisma.Subjects.create({
      data,
    });
  }
  async findOneSubjects(id: number) {
    return this.prisma.Subjects.findUnique({ where: { id } });
  }
  async updateSubjects(id: number, data: CreateSubjectsParams) {
    return this.prisma.Subjects.update({
      where: { id },
      data,
    });
  }
  async changeStateBoolSubjects(id: number) {
    const Subjects = await this.prisma.Subjects.findFirst({
      where: {
        id,
      },
    });
    if (!Subjects) {
      return { message: "Subjects not found" };
    }
    if (Subjects.state) {
      await this.prisma.Subjects.update({
        where: {
          id: Subjects.id,
        },
        data: {
          state: false,
        },
      });
      return { message: "Subjects disabled successfully" };
    } else {
      await this.prisma.Subjects.update({
        where: {
          id: Subjects.id,
        },
        data: {
          state: true,
        },
      });
      return { message: "Subjects enabled successfully" };
    }
  } */
}
