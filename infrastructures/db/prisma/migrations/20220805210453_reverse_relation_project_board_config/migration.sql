/*
  Warnings:

  - A unique constraint covering the columns `[boardConfigId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `boardConfigId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectBoardConfig" DROP CONSTRAINT "ProjectBoardConfig_id_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "boardConfigId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_boardConfigId_key" ON "Project"("boardConfigId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_boardConfigId_fkey" FOREIGN KEY ("boardConfigId") REFERENCES "ProjectBoardConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
