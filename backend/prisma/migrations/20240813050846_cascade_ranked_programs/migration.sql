-- DropForeignKey
ALTER TABLE "RankedProgram" DROP CONSTRAINT "RankedProgram_rankListId_fkey";

-- AddForeignKey
ALTER TABLE "RankedProgram" ADD CONSTRAINT "RankedProgram_rankListId_fkey" FOREIGN KEY ("rankListId") REFERENCES "RankList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
