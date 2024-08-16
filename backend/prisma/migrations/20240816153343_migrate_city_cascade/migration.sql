-- DropForeignKey
ALTER TABLE "CityUserInput" DROP CONSTRAINT "CityUserInput_cityId_fkey";

-- AddForeignKey
ALTER TABLE "CityUserInput" ADD CONSTRAINT "CityUserInput_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
