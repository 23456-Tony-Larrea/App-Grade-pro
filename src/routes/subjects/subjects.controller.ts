import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
  } from "@nestjs/common";
import { CreateSubjectParams, SubjectsService } from "src/controllers/subjects/subjects.service";
import { SubjectsDto } from "src/DTO/Subjects/subjectsDTO";

  
  @Controller("subject")
  export class subjectController {
    constructor(private readonly subjectService: SubjectsService) {}
  
    @Get()
    async getAllsubjects() {
      return this.subjectService.findAllsubject();
    }
    @Post()
    async createsubject(@Body() subjectData: CreateSubjectParams) {
      return this.subjectService.createsubject(subjectData);
    }
    @Get(":id")
    async getOnesubject(@Param("id") id: number) {
      return this.subjectService.findOnesubject(id);
    }
    @Put(":id")
    async updatesubject(@Param("id") id: string, @Body() subjectData: SubjectsDto) {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new BadRequestException({
          message: "Invalid user ID",
          statusCode: 400,
        });
      }
      subjectData.id = numericId;
      return this.subjectService.updatesubject(numericId, subjectData);
    }
    @Put(":id/change-state")
    async changeStateBooleansubject(@Param("id") id: string) {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new BadRequestException({
          message: "Invalid user ID",
          statusCode: 400,
        });
      }
      return this.subjectService.changeStateBoolsubject(numericId);
    }
  }
  