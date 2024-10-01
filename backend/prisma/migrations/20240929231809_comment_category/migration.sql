-- CreateEnum
CREATE TYPE "CommentCategory" AS ENUM ('VENT', 'ADVICE', 'SERIOUS_QUESTION', 'HAPPY');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "category" "CommentCategory";
