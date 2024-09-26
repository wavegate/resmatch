-- CreateEnum
CREATE TYPE "SignalTier" AS ENUM ('GOLD', 'SILVER');

-- AlterTable
ALTER TABLE "InterviewInvite" ADD COLUMN     "signalTier" "SignalTier";
