/*
  Warnings:

  - You are about to drop the `FameShameUserInput` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FameShameUserInput" DROP CONSTRAINT "FameShameUserInput_programId_fkey";

-- DropForeignKey
ALTER TABLE "FameShameUserInput" DROP CONSTRAINT "FameShameUserInput_userId_fkey";

-- DropTable
DROP TABLE "FameShameUserInput";

-- CreateTable
CREATE TABLE "FameShame" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fame" TEXT,
    "shame" TEXT,
    "programId" INTEGER NOT NULL,
    "anonymous" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FameShame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FameShame" ADD CONSTRAINT "FameShame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FameShame" ADD CONSTRAINT "FameShame_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
