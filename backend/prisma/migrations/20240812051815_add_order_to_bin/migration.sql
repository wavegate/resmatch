/*
  Warnings:

  - A unique constraint covering the columns `[tierListId,order]` on the table `Bin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Bin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bin" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bin_tierListId_order_key" ON "Bin"("tierListId", "order");
