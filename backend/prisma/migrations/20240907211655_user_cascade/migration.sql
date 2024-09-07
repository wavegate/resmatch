-- DropForeignKey
ALTER TABLE "CityUserInput" DROP CONSTRAINT "CityUserInput_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Dropped" DROP CONSTRAINT "Dropped_userId_fkey";

-- DropForeignKey
ALTER TABLE "FameShame" DROP CONSTRAINT "FameShame_userId_fkey";

-- DropForeignKey
ALTER TABLE "FellowshipMatch" DROP CONSTRAINT "FellowshipMatch_userId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewImpression" DROP CONSTRAINT "InterviewImpression_userId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewInvite" DROP CONSTRAINT "InterviewInvite_userId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewLogistics" DROP CONSTRAINT "InterviewLogistics_userId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewRejection" DROP CONSTRAINT "InterviewRejection_userId_fkey";

-- DropForeignKey
ALTER TABLE "LOIResponse" DROP CONSTRAINT "LOIResponse_userId_fkey";

-- DropForeignKey
ALTER TABLE "M4InternImpression" DROP CONSTRAINT "M4InternImpression_userId_fkey";

-- DropForeignKey
ALTER TABLE "Malignant" DROP CONSTRAINT "Malignant_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostIVCommunication" DROP CONSTRAINT "PostIVCommunication_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "RankList" DROP CONSTRAINT "RankList_userId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleDetails" DROP CONSTRAINT "ScheduleDetails_userId_fkey";

-- DropForeignKey
ALTER TABLE "SecondLook" DROP CONSTRAINT "SecondLook_userId_fkey";

-- DropForeignKey
ALTER TABLE "Suggestion" DROP CONSTRAINT "Suggestion_userId_fkey";

-- DropForeignKey
ALTER TABLE "XorY" DROP CONSTRAINT "XorY_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discordId" TEXT,
ADD COLUMN     "redditId" TEXT;

-- AddForeignKey
ALTER TABLE "InterviewInvite" ADD CONSTRAINT "InterviewInvite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityUserInput" ADD CONSTRAINT "CityUserInput_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FameShame" ADD CONSTRAINT "FameShame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankList" ADD CONSTRAINT "RankList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostIVCommunication" ADD CONSTRAINT "PostIVCommunication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleDetails" ADD CONSTRAINT "ScheduleDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewLogistics" ADD CONSTRAINT "InterviewLogistics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondLook" ADD CONSTRAINT "SecondLook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewRejection" ADD CONSTRAINT "InterviewRejection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M4InternImpression" ADD CONSTRAINT "M4InternImpression_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Malignant" ADD CONSTRAINT "Malignant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LOIResponse" ADD CONSTRAINT "LOIResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewImpression" ADD CONSTRAINT "InterviewImpression_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dropped" ADD CONSTRAINT "Dropped_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FellowshipMatch" ADD CONSTRAINT "FellowshipMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XorY" ADD CONSTRAINT "XorY_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
