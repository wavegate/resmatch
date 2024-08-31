/*
  Warnings:

  - You are about to drop the column `discordLink` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `redditLink` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "discordLink",
DROP COLUMN "redditLink",
ADD COLUMN     "discordUsername" TEXT,
ADD COLUMN     "redditUsername" TEXT;
