-- CreateEnum
CREATE TYPE "GraduateType" AS ENUM ('US', 'IMG');

-- CreateEnum
CREATE TYPE "IMGType" AS ENUM ('nonUSIMG', 'USIMG');

-- CreateEnum
CREATE TYPE "LocationState" AS ENUM ('IS', 'OOS');

-- CreateEnum
CREATE TYPE "MedicalDegree" AS ENUM ('MD', 'DO');

-- CreateTable
CREATE TABLE "InterviewInvite" (
    "id" SERIAL NOT NULL,
    "anonymous" BOOLEAN NOT NULL,
    "graduateType" "GraduateType" NOT NULL,
    "img" "IMGType",
    "inviteDateTime" TIMESTAMP(3) NOT NULL,
    "geographicPreference" BOOLEAN NOT NULL,
    "signal" BOOLEAN NOT NULL,
    "locationState" "LocationState" NOT NULL,
    "medicalDegree" "MedicalDegree" NOT NULL,
    "step1ScorePass" BOOLEAN NOT NULL,
    "step1Score" INTEGER,
    "step2Score" INTEGER,
    "comlex1ScorePass" BOOLEAN NOT NULL,
    "comlex2Score" TEXT,
    "visaRequired" BOOLEAN NOT NULL,
    "subI" BOOLEAN NOT NULL,
    "home" BOOLEAN NOT NULL,
    "yearOfGraduation" INTEGER NOT NULL,
    "greenCard" BOOLEAN NOT NULL,
    "away" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewInvite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewInvite" ADD CONSTRAINT "InterviewInvite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewInvite" ADD CONSTRAINT "InterviewInvite_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
