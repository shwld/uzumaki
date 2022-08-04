/*
  Warnings:

  - You are about to drop the column `currentVelocity` on the `Project` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "currentVelocity";

-- CreateTable
CREATE TABLE "ProjectBoardConfig" (
    "id" TEXT NOT NULL,
    "initialVelocity" INTEGER NOT NULL DEFAULT 10,
    "startOn" TIMESTAMP(3),
    "startIterationOn" "DayOfWeek" NOT NULL DEFAULT 'MONDAY',
    "iterationLength" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "ProjectBoardConfig_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectBoardConfig" ADD CONSTRAINT "ProjectBoardConfig_id_fkey" FOREIGN KEY ("id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
