-- DropForeignKey
ALTER TABLE "InterviewLogistics" DROP CONSTRAINT "InterviewLogistics_interviewInviteId_fkey";

-- AlterTable
ALTER TABLE "InterviewLogistics" ALTER COLUMN "interviewInviteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "InterviewLogistics" ADD CONSTRAINT "InterviewLogistics_interviewInviteId_fkey" FOREIGN KEY ("interviewInviteId") REFERENCES "InterviewInvite"("id") ON DELETE SET NULL ON UPDATE CASCADE;
