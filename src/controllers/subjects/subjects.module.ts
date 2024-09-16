import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { subjectController } from "src/routes/subjects/subjects.controller";
import { SubjectsService } from "./subjects.service";

@Module({
    controllers: [subjectController],
    providers: [SubjectsService, PrismaService],
    exports: [SubjectsService],  
})
export class SubjectsModule {}
