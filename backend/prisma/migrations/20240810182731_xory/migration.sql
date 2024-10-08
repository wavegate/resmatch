-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "main" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "xorYId" INTEGER;

-- CreateTable
CREATE TABLE "XorY" (
    "id" SERIAL NOT NULL,
    "programXId" INTEGER NOT NULL,
    "programYId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "XorY_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_xorYId_fkey" FOREIGN KEY ("xorYId") REFERENCES "XorY"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XorY" ADD CONSTRAINT "XorY_programXId_fkey" FOREIGN KEY ("programXId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XorY" ADD CONSTRAINT "XorY_programYId_fkey" FOREIGN KEY ("programYId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
