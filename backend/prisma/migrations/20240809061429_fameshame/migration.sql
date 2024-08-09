-- CreateTable
CREATE TABLE "FameShameUserInput" (
    "id" SERIAL NOT NULL,
    "fame" TEXT NOT NULL,
    "shame" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FameShameUserInput_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FameShameUserInput" ADD CONSTRAINT "FameShameUserInput_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FameShameUserInput" ADD CONSTRAINT "FameShameUserInput_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
