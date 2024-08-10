-- CreateEnum
CREATE TYPE "MalignantEnum" AS ENUM ('Yes', 'No', 'Maybe');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "interviewImpressionId" INTEGER,
ADD COLUMN     "lOIResponseId" INTEGER,
ADD COLUMN     "m4InternImpressionId" INTEGER,
ADD COLUMN     "malignantId" INTEGER,
ADD COLUMN     "postIVCommunicationId" INTEGER,
ADD COLUMN     "scheduleDetailsId" INTEGER;

-- CreateTable
CREATE TABLE "PostIVCommunication" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "communicationReceived" TEXT,
    "thankYouLetterPolicy" TEXT,
    "rankImpact" TEXT,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostIVCommunication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleDetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "longOvernightCall" TEXT,
    "scheduleContinuity" TEXT,
    "locations" TEXT,
    "emr" TEXT,
    "startDateOrientation" TIMESTAMP(3),
    "visaInfo" TEXT,
    "union" TEXT,
    "midlevel" TEXT,
    "ancillary" TEXT,
    "teamRatios" TEXT,
    "internCap" TEXT,
    "admittingSystem" TEXT,
    "icuHours" TEXT,
    "nightFloat" TEXT,
    "sickCallSystem" TEXT,
    "moonlighting" TEXT,
    "stayUntilSignout" TEXT,
    "didactics" TEXT,
    "vacationHolidays" TEXT,
    "gym" TEXT,
    "food" TEXT,
    "salary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduleDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewLogistics" (
    "id" SERIAL NOT NULL,
    "sortType" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "schedulerPlatform" TEXT,
    "ivFormat" TEXT,
    "timeSlots" TEXT,
    "ivPlatform" TEXT,
    "openIVDates" TIMESTAMP(3)[],
    "interviewInviteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewLogistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecondLook" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "setting" TEXT,
    "date" TIMESTAMP(3),
    "bearingOnRank" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecondLook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewRejection" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewRejection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewWithdrawal" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewWithdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M4InternImpression" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "positiveImpression" TEXT,
    "negativeImpression" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M4InternImpression_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Malignant" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "malignant" "MalignantEnum" NOT NULL,
    "source" TEXT,
    "explanation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Malignant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LOIResponse" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "intent" BOOLEAN,
    "sentTo" TEXT,
    "dateSent" TIMESTAMP(3),
    "response" BOOLEAN,
    "responseTone" TEXT,
    "timeBetweenSentAndResponse" TEXT,
    "mentionedTopChoice" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LOIResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewImpression" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "positives" TEXT,
    "negatives" TEXT,
    "howInterviewDayAffectsRank" TEXT,
    "gift" TEXT,
    "timeGiftReceived" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewImpression_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postIVCommunicationId_fkey" FOREIGN KEY ("postIVCommunicationId") REFERENCES "PostIVCommunication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_scheduleDetailsId_fkey" FOREIGN KEY ("scheduleDetailsId") REFERENCES "ScheduleDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_m4InternImpressionId_fkey" FOREIGN KEY ("m4InternImpressionId") REFERENCES "M4InternImpression"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_malignantId_fkey" FOREIGN KEY ("malignantId") REFERENCES "Malignant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_lOIResponseId_fkey" FOREIGN KEY ("lOIResponseId") REFERENCES "LOIResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_interviewImpressionId_fkey" FOREIGN KEY ("interviewImpressionId") REFERENCES "InterviewImpression"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostIVCommunication" ADD CONSTRAINT "PostIVCommunication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostIVCommunication" ADD CONSTRAINT "PostIVCommunication_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleDetails" ADD CONSTRAINT "ScheduleDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleDetails" ADD CONSTRAINT "ScheduleDetails_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewLogistics" ADD CONSTRAINT "InterviewLogistics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewLogistics" ADD CONSTRAINT "InterviewLogistics_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewLogistics" ADD CONSTRAINT "InterviewLogistics_interviewInviteId_fkey" FOREIGN KEY ("interviewInviteId") REFERENCES "InterviewInvite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondLook" ADD CONSTRAINT "SecondLook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondLook" ADD CONSTRAINT "SecondLook_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewRejection" ADD CONSTRAINT "InterviewRejection_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewRejection" ADD CONSTRAINT "InterviewRejection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewWithdrawal" ADD CONSTRAINT "InterviewWithdrawal_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewWithdrawal" ADD CONSTRAINT "InterviewWithdrawal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M4InternImpression" ADD CONSTRAINT "M4InternImpression_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M4InternImpression" ADD CONSTRAINT "M4InternImpression_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Malignant" ADD CONSTRAINT "Malignant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Malignant" ADD CONSTRAINT "Malignant_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LOIResponse" ADD CONSTRAINT "LOIResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LOIResponse" ADD CONSTRAINT "LOIResponse_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewImpression" ADD CONSTRAINT "InterviewImpression_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewImpression" ADD CONSTRAINT "InterviewImpression_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
