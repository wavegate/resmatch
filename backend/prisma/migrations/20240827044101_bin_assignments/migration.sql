-- CreateTable
CREATE TABLE "BinAssignment" (
    "id" SERIAL NOT NULL,
    "binId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "BinAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BinAssignment_binId_programId_key" ON "BinAssignment"("binId", "programId");

-- CreateIndex
CREATE UNIQUE INDEX "BinAssignment_binId_rank_key" ON "BinAssignment"("binId", "rank");

-- AddForeignKey
ALTER TABLE "BinAssignment" ADD CONSTRAINT "BinAssignment_binId_fkey" FOREIGN KEY ("binId") REFERENCES "Bin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinAssignment" ADD CONSTRAINT "BinAssignment_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
