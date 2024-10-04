-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "replyCommentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_replyCommentId_fkey" FOREIGN KEY ("replyCommentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
