-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "cityId" INTEGER;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
