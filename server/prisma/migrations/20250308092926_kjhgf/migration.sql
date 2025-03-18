/*
  Warnings:

  - You are about to drop the column `carNumberPlate` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Driver` table. All the data in the column will be lost.
  - You are about to alter the column `phoneNumber` on the `Driver` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `name` on the `School` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[carPlateNumber]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `carPlateNumber` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_parentId_fkey";

-- DropIndex
DROP INDEX "Driver_carNumberPlate_key";

-- DropIndex
DROP INDEX "Student_parentId_key";

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "carNumberPlate",
DROP COLUMN "name",
ADD COLUMN     "carPlateNumber" VARCHAR(20) NOT NULL,
ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "School" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
ALTER COLUMN "parentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_carPlateNumber_key" ON "Driver"("carPlateNumber");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
