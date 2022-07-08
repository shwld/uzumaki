/*
  Warnings:

  - Made the column `description` on table `Story` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Story` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectId` on table `Story` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Story" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "projectId" SET NOT NULL;
