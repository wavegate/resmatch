/*
  Warnings:

  - Added the required column `userId` to the `RankList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RankList" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "RankList" ADD CONSTRAINT "RankList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
