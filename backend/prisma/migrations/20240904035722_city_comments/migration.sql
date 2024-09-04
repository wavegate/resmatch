-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "cityUserInputId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_cityUserInputId_fkey" FOREIGN KEY ("cityUserInputId") REFERENCES "CityUserInput"("id") ON DELETE SET NULL ON UPDATE CASCADE;
