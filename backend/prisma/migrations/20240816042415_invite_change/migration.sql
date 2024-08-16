/*
  Warnings:

  - The values [top10,top25,top50,bottom50] on the enum `ClassRanking` will be removed. If these variants are still used in the database, this will fail.
  - The values [nonUSIMG] on the enum `IMGType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pathway1,Pathway2,Pathway3,Pathway4,Pathway5,Pathway6] on the enum `Pathway` will be removed. If these variants are still used in the database, this will fail.
  - The values [top20,top50,mid,low,unranked] on the enum `SchoolRanking` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `locationState` on the `InterviewInvite` table. All the data in the column will be lost.
  - You are about to drop the column `interviewInviteId` on the `InterviewLogistics` table. All the data in the column will be lost.
  - You are about to drop the column `locationState` on the `InterviewRejection` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ClassRanking_new" AS ENUM ('QUARTILE1', 'QUARTILE2', 'QUARTILE3', 'QUARTILE4');
ALTER TABLE "User" ALTER COLUMN "classRank" TYPE "ClassRanking_new" USING ("classRank"::text::"ClassRanking_new");
ALTER TYPE "ClassRanking" RENAME TO "ClassRanking_old";
ALTER TYPE "ClassRanking_new" RENAME TO "ClassRanking";
DROP TYPE "ClassRanking_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "IMGType_new" AS ENUM ('NONUSIMG', 'USIMG');
ALTER TABLE "User" ALTER COLUMN "img" TYPE "IMGType_new" USING ("img"::text::"IMGType_new");
ALTER TABLE "InterviewInvite" ALTER COLUMN "img" TYPE "IMGType_new" USING ("img"::text::"IMGType_new");
ALTER TABLE "InterviewRejection" ALTER COLUMN "img" TYPE "IMGType_new" USING ("img"::text::"IMGType_new");
ALTER TYPE "IMGType" RENAME TO "IMGType_old";
ALTER TYPE "IMGType_new" RENAME TO "IMGType";
DROP TYPE "IMGType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Pathway_new" AS ENUM ('PATHWAY1', 'PATHWAY2', 'PATHWAY3', 'PATHWAY4', 'PATHWAY5', 'PATHWAY6');
ALTER TABLE "User" ALTER COLUMN "step2CSPathway" TYPE "Pathway_new" USING ("step2CSPathway"::text::"Pathway_new");
ALTER TYPE "Pathway" RENAME TO "Pathway_old";
ALTER TYPE "Pathway_new" RENAME TO "Pathway";
DROP TYPE "Pathway_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SchoolRanking_new" AS ENUM ('TOP20', 'TOP50', 'MID', 'LOW', 'UNRANKED');
ALTER TABLE "User" ALTER COLUMN "schoolRanking" TYPE "SchoolRanking_new" USING ("schoolRanking"::text::"SchoolRanking_new");
ALTER TYPE "SchoolRanking" RENAME TO "SchoolRanking_old";
ALTER TYPE "SchoolRanking_new" RENAME TO "SchoolRanking";
DROP TYPE "SchoolRanking_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "InterviewLogistics" DROP CONSTRAINT "InterviewLogistics_interviewInviteId_fkey";

-- AlterTable
ALTER TABLE "InterviewInvite" DROP COLUMN "locationState",
ADD COLUMN     "fail" INTEGER,
ADD COLUMN     "highPass" INTEGER,
ADD COLUMN     "honors" INTEGER,
ADD COLUMN     "inState" BOOLEAN,
ADD COLUMN     "pass" INTEGER,
ADD COLUMN     "pstp" BOOLEAN;

-- AlterTable
ALTER TABLE "InterviewLogistics" DROP COLUMN "interviewInviteId";

-- AlterTable
ALTER TABLE "InterviewRejection" DROP COLUMN "locationState",
ADD COLUMN     "fail" INTEGER,
ADD COLUMN     "highPass" INTEGER,
ADD COLUMN     "honors" INTEGER,
ADD COLUMN     "inState" BOOLEAN,
ADD COLUMN     "pass" INTEGER,
ADD COLUMN     "pstp" BOOLEAN;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fail" INTEGER,
ADD COLUMN     "highPass" INTEGER,
ADD COLUMN     "honors" INTEGER,
ADD COLUMN     "pass" INTEGER,
ADD COLUMN     "pstp" BOOLEAN;

-- DropEnum
DROP TYPE "LocationState";
