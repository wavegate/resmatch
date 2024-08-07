-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityUserInput" (
    "id" SERIAL NOT NULL,
    "pros" TEXT NOT NULL,
    "cons" TEXT NOT NULL,
    "publicTransportation" TEXT NOT NULL,
    "weather" TEXT NOT NULL,
    "dating" TEXT NOT NULL,
    "lgbtq" TEXT NOT NULL,
    "diversity" TEXT NOT NULL,
    "safetyCrime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "CityUserInput_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "City_name_state_idx" ON "City"("name", "state");

-- CreateIndex
CREATE INDEX "CityUserInput_cityId_idx" ON "CityUserInput"("cityId");

-- CreateIndex
CREATE INDEX "CityUserInput_userId_idx" ON "CityUserInput"("userId");

-- AddForeignKey
ALTER TABLE "CityUserInput" ADD CONSTRAINT "CityUserInput_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityUserInput" ADD CONSTRAINT "CityUserInput_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
