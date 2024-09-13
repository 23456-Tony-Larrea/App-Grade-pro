import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  CourseService,
  CreateCourseParams,
} from "src/controllers/course/course.service";
import { CourseDto } from "src/DTO/course/courseDTO";

@Controller("course")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourses() {
    return this.courseService.findAllCourse();
  }
  @Post()
  async createCourse(@Body() courseData: CreateCourseParams) {
    return this.courseService.createCourse(courseData);
  }
  @Get(":id")
  async getOneCourse(@Param("id") id: number) {
    return this.courseService.findOneCourse(id);
  }
  @Put(":id")
  async updateCourse(@Param("id") id: string, @Body() courseData: CourseDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException({
        message: "Invalid user ID",
        statusCode: 400,
      });
    }
    courseData.id = numericId;
    return this.courseService.updateCourse(numericId, courseData);
  }
  @Put(":id/change-state")
  async changeStateBooleanCourse(@Param("id") id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException({
        message: "Invalid user ID",
        statusCode: 400,
      });
    }
    return this.courseService.changeStateBoolCourse(numericId);
  }
}
