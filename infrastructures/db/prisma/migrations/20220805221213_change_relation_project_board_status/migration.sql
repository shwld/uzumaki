/*
  Warnings:

  - You are about to drop the column `projectId` on the `ProjectBoardStatus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[boardStatusId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `boardStatusId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectBoardStatus" DROP CONSTRAINT "ProjectBoardStatus_projectId_fkey";

-- DropIndex
DROP INDEX "ProjectBoardStatus_projectId_key";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "boardStatusId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProjectBoardStatus" DROP COLUMN "projectId";

-- CreateIndex
CREATE UNIQUE INDEX "Project_boardStatusId_key" ON "Project"("boardStatusId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_boardStatusId_fkey" FOREIGN KEY ("boardStatusId") REFERENCES "ProjectBoardStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
