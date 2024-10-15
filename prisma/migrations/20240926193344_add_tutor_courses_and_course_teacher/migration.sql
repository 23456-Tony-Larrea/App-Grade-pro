/*
  Warnings:

  - You are about to drop the `CourseSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseSubject" DROP CONSTRAINT "CourseSubject_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseSubject" DROP CONSTRAINT "CourseSubject_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSubject" DROP CONSTRAINT "UserSubject_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "UserSubject" DROP CONSTRAINT "UserSubject_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "courseId" INTEGER;

-- DropTable
DROP TABLE "CourseSubject";

-- DropTable
DROP TABLE "UserCourse";

-- DropTable
DROP TABLE "UserSubject";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
