/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `Driver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "phoneNumber";

-- AlterTable
ALTER TABLE "School" ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNumber" VARCHAR(20);
