/*
  Warnings:

  - A unique constraint covering the columns `[pdfId]` on the table `PDF` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pdfId` to the `PDF` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PDF" ADD COLUMN     "pdfId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PDF_pdfId_key" ON "PDF"("pdfId");
