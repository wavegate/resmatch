/*
  Warnings:

  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Thread` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_threadId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_userId_fkey";

-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "pstp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "report" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Reply";

-- DropTable
DROP TABLE "Thread";
