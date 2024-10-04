-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('COMMENT_REPLY', 'POST_COMMENT', 'PROGRAM_UPDATE');

-- CreateTable
CREATE TABLE "Notification" (
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,
    "rankListId" INTEGER,
    "postIVCommunicationId" INTEGER,
    "scheduleDetailsId" INTEGER,
    "m4InternImpressionId" INTEGER,
    "malignantId" INTEGER,
    "lOIResponseId" INTEGER,
    "interviewImpressionId" INTEGER,
    "xorYId" INTEGER,
    "interviewInviteId" INTEGER,
    "fameShameId" INTEGER,
    "interviewLogisticsId" INTEGER,
    "secondLookId" INTEGER,
    "interviewRejectionId" INTEGER,
    "questionId" INTEGER,
    "droppedId" INTEGER,
    "fellowshipMatchId" INTEGER,
    "cityUserInputId" INTEGER,
    "commentId" INTEGER,
    "notificationType" "NotificationType" NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_rankListId_fkey" FOREIGN KEY ("rankListId") REFERENCES "RankList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_postIVCommunicationId_fkey" FOREIGN KEY ("postIVCommunicationId") REFERENCES "PostIVCommunication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_scheduleDetailsId_fkey" FOREIGN KEY ("scheduleDetailsId") REFERENCES "ScheduleDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_m4InternImpressionId_fkey" FOREIGN KEY ("m4InternImpressionId") REFERENCES "M4InternImpression"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_malignantId_fkey" FOREIGN KEY ("malignantId") REFERENCES "Malignant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_lOIResponseId_fkey" FOREIGN KEY ("lOIResponseId") REFERENCES "LOIResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_interviewImpressionId_fkey" FOREIGN KEY ("interviewImpressionId") REFERENCES "InterviewImpression"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_xorYId_fkey" FOREIGN KEY ("xorYId") REFERENCES "XorY"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_interviewInviteId_fkey" FOREIGN KEY ("interviewInviteId") REFERENCES "InterviewInvite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_fameShameId_fkey" FOREIGN KEY ("fameShameId") REFERENCES "FameShame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_interviewLogisticsId_fkey" FOREIGN KEY ("interviewLogisticsId") REFERENCES "InterviewLogistics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_secondLookId_fkey" FOREIGN KEY ("secondLookId") REFERENCES "SecondLook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_interviewRejectionId_fkey" FOREIGN KEY ("interviewRejectionId") REFERENCES "InterviewRejection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_droppedId_fkey" FOREIGN KEY ("droppedId") REFERENCES "Dropped"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_fellowshipMatchId_fkey" FOREIGN KEY ("fellowshipMatchId") REFERENCES "FellowshipMatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_cityUserInputId_fkey" FOREIGN KEY ("cityUserInputId") REFERENCES "CityUserInput"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
