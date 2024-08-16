-- AlterTable
ALTER TABLE "CityUserInput" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Dropped" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "FameShame" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "FellowshipMatch" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "InterviewImpression" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "InterviewInvite" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "InterviewLogistics" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "InterviewRejection" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "InterviewWithdrawal" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "LOIResponse" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "M4InternImpression" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Malignant" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "PostIVCommunication" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "RankList" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "ScheduleDetails" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "SecondLook" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Suggestion" ALTER COLUMN "anonymous" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "public" SET DEFAULT true;

-- AlterTable
ALTER TABLE "XorY" ALTER COLUMN "anonymous" SET DEFAULT false;
