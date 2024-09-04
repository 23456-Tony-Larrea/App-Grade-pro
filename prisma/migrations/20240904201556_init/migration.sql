/*
  Warnings:

  - Added the required column `state` to the `PermissionRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PermissionRole" ADD COLUMN     "state" BOOLEAN NOT NULL;
