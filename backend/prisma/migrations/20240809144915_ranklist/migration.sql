-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "rankListId" INTEGER;

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "rankListId" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankList" (
    "id" SERIAL NOT NULL,
    "graduateType" "GraduateType" NOT NULL,
    "numberOfProgramsApplied" INTEGER,
    "numberOfInvites" INTEGER,
    "numberOfInterviewsAttended" INTEGER,
    "doneWithInterviews" BOOLEAN NOT NULL,
    "whyNumberOne" TEXT,
    "prioritiesWhenRanking" TEXT,
    "hardestPartOfRanking" TEXT,
    "matchedProgramId" INTEGER,

    CONSTRAINT "RankList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RankedPrograms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RankedPrograms_AB_unique" ON "_RankedPrograms"("A", "B");

-- CreateIndex
CREATE INDEX "_RankedPrograms_B_index" ON "_RankedPrograms"("B");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_rankListId_fkey" FOREIGN KEY ("rankListId") REFERENCES "RankList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankList" ADD CONSTRAINT "RankList_matchedProgramId_fkey" FOREIGN KEY ("matchedProgramId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RankedPrograms" ADD CONSTRAINT "_RankedPrograms_A_fkey" FOREIGN KEY ("A") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RankedPrograms" ADD CONSTRAINT "_RankedPrograms_B_fkey" FOREIGN KEY ("B") REFERENCES "RankList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
