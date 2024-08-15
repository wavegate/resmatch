/*
  Warnings:

  - The `howInterviewDayAffectsRank` column on the `InterviewImpression` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sentTo` column on the `LOIResponse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `responseTone` column on the `LOIResponse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `thankYouLetterPolicy` column on the `PostIVCommunication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rankImpact` column on the `PostIVCommunication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `source` column on the `PostIVCommunication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `setting` column on the `SecondLook` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ThankYouLetterPolicy" AS ENUM ('DO_NOT_SEND', 'STRONGLY_DISCOURAGED', 'DISCOURAGED', 'NOT_EXPECTED', 'NOT_REQUIRED', 'WELCOMED_BUT_NOT_EXPECTED', 'WELCOMED', 'POSITIVE_RESPONSE');

-- CreateEnum
CREATE TYPE "Source" AS ENUM ('PD', 'PC', 'SELECTION_COMMITTEE', 'RESIDENT', 'WEBSITE', 'STATEMENT_OF_MATCH_INTEGRITY', 'INTERVIEWER');

-- CreateEnum
CREATE TYPE "Setting" AS ENUM ('IN_PERSON', 'VIRTUAL', 'BOTH');

-- CreateEnum
CREATE TYPE "LOIResponseRecipient" AS ENUM ('PROGRAM_EMAIL', 'PC', 'PD', 'PD_PC', 'EMAIL_ON_ERAS', 'RESIDENCY_EXPLORER_EMAIL');

-- CreateEnum
CREATE TYPE "ResponseTone" AS ENUM ('POSITIVE', 'GENERIC', 'NEUTRAL', 'NEGATIVE', 'AUTOMATED');

-- CreateEnum
CREATE TYPE "Change" AS ENUM ('MUCH_LOWER', 'LOWER', 'SLIGHTLY_LOWER', 'NO_CHANGE', 'SLIGHTLY_HIGHER', 'HIGHER', 'MUCH_HIGHER');

-- AlterTable
ALTER TABLE "InterviewImpression" DROP COLUMN "howInterviewDayAffectsRank",
ADD COLUMN     "howInterviewDayAffectsRank" "Change";

-- AlterTable
ALTER TABLE "LOIResponse" DROP COLUMN "sentTo",
ADD COLUMN     "sentTo" "LOIResponseRecipient",
DROP COLUMN "responseTone",
ADD COLUMN     "responseTone" "ResponseTone";

-- AlterTable
ALTER TABLE "PostIVCommunication" DROP COLUMN "thankYouLetterPolicy",
ADD COLUMN     "thankYouLetterPolicy" "ThankYouLetterPolicy",
DROP COLUMN "rankImpact",
ADD COLUMN     "rankImpact" BOOLEAN,
DROP COLUMN "source",
ADD COLUMN     "source" "Source";

-- AlterTable
ALTER TABLE "SecondLook" DROP COLUMN "setting",
ADD COLUMN     "setting" "Setting";
