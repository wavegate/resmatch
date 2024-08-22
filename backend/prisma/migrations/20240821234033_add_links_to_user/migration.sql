-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MOD', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discordLink" TEXT,
ADD COLUMN     "redditLink" TEXT,
ADD COLUMN     "role" "Role";
