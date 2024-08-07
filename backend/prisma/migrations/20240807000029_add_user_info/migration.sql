-- CreateEnum
CREATE TYPE "SchoolRanking" AS ENUM ('top20', 'top50', 'mid', 'low', 'unranked');

-- CreateEnum
CREATE TYPE "ClassRanking" AS ENUM ('top10', 'top25', 'top50', 'bottom50');

-- CreateEnum
CREATE TYPE "Pathway" AS ENUM ('Pathway1', 'Pathway2', 'Pathway3', 'Pathway4', 'Pathway5', 'Pathway6');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "aoa" BOOLEAN,
ADD COLUMN     "applicationYear" INTEGER,
ADD COLUMN     "classRank" "ClassRanking",
ADD COLUMN     "comlex1ScorePass" BOOLEAN,
ADD COLUMN     "comlex2Score" INTEGER,
ADD COLUMN     "ecfmgCertified" BOOLEAN,
ADD COLUMN     "goldHumanism" BOOLEAN,
ADD COLUMN     "graduateType" "GraduateType",
ADD COLUMN     "greenCard" BOOLEAN,
ADD COLUMN     "img" "IMGType",
ADD COLUMN     "medicalDegree" "MedicalDegree",
ADD COLUMN     "monthsOfUSCE" INTEGER,
ADD COLUMN     "numApplications" INTEGER,
ADD COLUMN     "numInterviews" INTEGER,
ADD COLUMN     "numPublications" INTEGER,
ADD COLUMN     "numRejected" INTEGER,
ADD COLUMN     "numVolunteerExperiences" INTEGER,
ADD COLUMN     "numWaitlisted" INTEGER,
ADD COLUMN     "numWithdrawn" INTEGER,
ADD COLUMN     "numWorkExperiences" INTEGER,
ADD COLUMN     "otherDegrees" TEXT,
ADD COLUMN     "redFlags" BOOLEAN,
ADD COLUMN     "redFlagsExplanation" TEXT,
ADD COLUMN     "schoolRanking" "SchoolRanking",
ADD COLUMN     "sigmaSigmaPhi" BOOLEAN,
ADD COLUMN     "step1Score" INTEGER,
ADD COLUMN     "step1ScorePass" BOOLEAN,
ADD COLUMN     "step2CSPathway" "Pathway",
ADD COLUMN     "step2Score" INTEGER,
ADD COLUMN     "step3Score" INTEGER,
ADD COLUMN     "visaRequired" BOOLEAN,
ADD COLUMN     "yearOfGraduation" INTEGER;
