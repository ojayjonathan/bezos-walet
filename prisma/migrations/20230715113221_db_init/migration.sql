/*
  Warnings:

  - You are about to drop the column `isOwnedByBezos` on the `merchants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "merchants" DROP COLUMN "isOwnedByBezos",
ADD COLUMN     "tagId" INTEGER;

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "merchants" ADD CONSTRAINT "merchants_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;
