/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `point` on the `Usage` table. All the data in the column will be lost.
  - Added the required column `points` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usage" DROP COLUMN "expiresAt",
DROP COLUMN "point",
ADD COLUMN     "expire" TIMESTAMP(3),
ADD COLUMN     "points" INTEGER NOT NULL;
