-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_requesterId_fkey";

-- AlterTable
ALTER TABLE "Story" ALTER COLUMN "requesterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "ProjectMembership"("id") ON DELETE SET NULL ON UPDATE CASCADE;
