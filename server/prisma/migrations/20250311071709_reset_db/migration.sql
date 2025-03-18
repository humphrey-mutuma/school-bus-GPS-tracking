/*
  Warnings:

  - A unique constraint covering the columns `[schoolId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schoolId` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "schoolId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Driver_schoolId_key" ON "Driver"("schoolId");

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
