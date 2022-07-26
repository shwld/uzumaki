/*
  Warnings:

  - The primary key for the `ProjectMembership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,projectId]` on the table `ProjectMembership` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `ProjectMembership` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "ProjectMembership" DROP CONSTRAINT "ProjectMembership_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ProjectMembership_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ProjectMemberInvitation" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT,
    "projectId" TEXT NOT NULL,
    "role" "ProjectMemberRole" NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectMemberInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMembership_userId_projectId_key" ON "ProjectMembership"("userId", "projectId");

-- AddForeignKey
ALTER TABLE "ProjectMemberInvitation" ADD CONSTRAINT "ProjectMemberInvitation_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "ProjectMembership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMemberInvitation" ADD CONSTRAINT "ProjectMemberInvitation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
