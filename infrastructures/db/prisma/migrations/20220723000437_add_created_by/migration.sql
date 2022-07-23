/*
  Warnings:

  - Added the required column `createdById` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `requesterId` on table `Story` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_requesterId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Story" ALTER COLUMN "requesterId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
