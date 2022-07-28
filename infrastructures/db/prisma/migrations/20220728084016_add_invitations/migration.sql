/*
  Warnings:

  - You are about to drop the column `state` on the `ProjectMembership` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectMembership" DROP COLUMN "state";

-- DropEnum
DROP TYPE "ProjectMemberState";

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

-- AddForeignKey
ALTER TABLE "ProjectMemberInvitation" ADD CONSTRAINT "ProjectMemberInvitation_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "ProjectMembership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMemberInvitation" ADD CONSTRAINT "ProjectMemberInvitation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
