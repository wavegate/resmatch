/*
  Warnings:

  - The `schedulerPlatform` column on the `InterviewLogistics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ivPlatform` column on the `InterviewLogistics` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SchedulerPlatform" AS ENUM ('THALAMUS', 'ERAS', 'IV_BROKER', 'INTERVIEW_BROKER', 'PROGRAM_EMAIL', 'ZOOM', 'REZRATE', 'PROGRAM_WEBSITE', 'COORDINATOR');

-- CreateEnum
CREATE TYPE "IVPlatform" AS ENUM ('ZOOM', 'THALAMUS', 'WEBEX', 'IN_PERSON', 'MICROSOFT_TEAMS', 'REZRATE', 'PANORAMAMD', 'GOOGLE_MEET');

-- AlterTable
ALTER TABLE "InterviewLogistics" ADD COLUMN     "dateOfferSent" TIMESTAMP(3),
DROP COLUMN "schedulerPlatform",
ADD COLUMN     "schedulerPlatform" "SchedulerPlatform",
DROP COLUMN "ivPlatform",
ADD COLUMN     "ivPlatform" "IVPlatform";
