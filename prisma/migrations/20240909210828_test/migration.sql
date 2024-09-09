-- AlterTable
ALTER TABLE "User" ADD COLUMN     "failed_login_attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "state" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "token" TEXT,
ADD COLUMN     "token_type" TEXT;
