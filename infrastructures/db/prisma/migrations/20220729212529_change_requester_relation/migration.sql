-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_requesterId_fkey";

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "ProjectMembership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
