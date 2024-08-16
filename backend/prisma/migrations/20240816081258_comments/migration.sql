-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "droppedId" INTEGER,
ADD COLUMN     "fameShameId" INTEGER,
ADD COLUMN     "fellowshipMatchId" INTEGER,
ADD COLUMN     "interviewInviteId" INTEGER,
ADD COLUMN     "interviewLogisticsId" INTEGER,
ADD COLUMN     "interviewRejectionId" INTEGER,
ADD COLUMN     "questionId" INTEGER,
ADD COLUMN     "secondLookId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_interviewInviteId_fkey" FOREIGN KEY ("interviewInviteId") REFERENCES "InterviewInvite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_fameShameId_fkey" FOREIGN KEY ("fameShameId") REFERENCES "FameShame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_interviewLogisticsId_fkey" FOREIGN KEY ("interviewLogisticsId") REFERENCES "InterviewLogistics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_secondLookId_fkey" FOREIGN KEY ("secondLookId") REFERENCES "SecondLook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_interviewRejectionId_fkey" FOREIGN KEY ("interviewRejectionId") REFERENCES "InterviewRejection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_droppedId_fkey" FOREIGN KEY ("droppedId") REFERENCES "Dropped"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_fellowshipMatchId_fkey" FOREIGN KEY ("fellowshipMatchId") REFERENCES "FellowshipMatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
