-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
