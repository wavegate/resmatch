/*
  Warnings:

  - You are about to drop the `_RankedPrograms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RankedPrograms" DROP CONSTRAINT "_RankedPrograms_A_fkey";

-- DropForeignKey
ALTER TABLE "_RankedPrograms" DROP CONSTRAINT "_RankedPrograms_B_fkey";

-- DropTable
DROP TABLE "_RankedPrograms";

-- CreateTable
CREATE TABLE "RankedProgram" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "rankListId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,

    CONSTRAINT "RankedProgram_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RankedProgram_rankListId_rank_key" ON "RankedProgram"("rankListId", "rank");

-- CreateIndex
CREATE UNIQUE INDEX "RankedProgram_rankListId_programId_key" ON "RankedProgram"("rankListId", "programId");

-- AddForeignKey
ALTER TABLE "RankedProgram" ADD CONSTRAINT "RankedProgram_rankListId_fkey" FOREIGN KEY ("rankListId") REFERENCES "RankList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankedProgram" ADD CONSTRAINT "RankedProgram_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
