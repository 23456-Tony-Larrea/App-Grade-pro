import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CourseDto } from "src/DTO/course/courseDTO";

export type CreateCourseParams = Omit<CourseDto, "id">;
@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}
  async findAllCourse() {
    return this.prisma.course.findMany();
  }
  async createCourse(data: CreateCourseParams) {
    await this.prisma.course.create({
      data,
    });
    return {
      message: "Curso creado con éxito",
    };
  }
  async findOneCourse(id: number) {
    return this.prisma.course.findUnique({ where: { id } });
  }
  async updateCourse(
    id: number,
    data: CreateCourseParams
  ): Promise<{ message: string; course: any }> {
    const course = await this.prisma.course.update({
      where: { id },
      data,
    });
    return {
      message: "Curso actualizado con éxito",
      course,
    };
  }
  async changeStateBoolCourse(id: number) {
    const course = await this.prisma.course.findFirst({
      where: {
        id,
      },
    });
    if (!course) {
      return { message: "Course not found" };
    }
    if (course.state) {
      await this.prisma.course.update({
        where: {
          id: course.id,
        },
        data: {
          state: false,
        },
      });
      return { message: "Curso desactivado con exito" };
    } else {
      await this.prisma.course.update({
        where: {
          id: course.id,
        },
        data: {
          state: true,
        },
      });
      return { message: "Curso activado con successfully" };
    }
  }
}
