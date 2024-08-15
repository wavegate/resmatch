/*
  Warnings:

  - The `emr` column on the `ScheduleDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `visaInfo` column on the `ScheduleDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `union` column on the `ScheduleDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EMR" AS ENUM ('EPIC', 'CERNER', 'MEDITECH', 'CPRS', 'ALLSCRIPTS', 'ORCHID', 'SOARIAN', 'SUNRISE', 'PARAGON', 'POWER_CHART', 'OMR', 'ICENTRA', 'CITRIX', 'OPTIMUM', 'MEDHOST', 'EPIC_CPRS');

-- CreateEnum
CREATE TYPE "VisaInfo" AS ENUM ('J1', 'H1B', 'NO_VISAS', 'ACCEPTS_VISA');

-- AlterTable
ALTER TABLE "ScheduleDetails" DROP COLUMN "emr",
ADD COLUMN     "emr" "EMR",
DROP COLUMN "visaInfo",
ADD COLUMN     "visaInfo" "VisaInfo",
DROP COLUMN "union",
ADD COLUMN     "union" BOOLEAN;
