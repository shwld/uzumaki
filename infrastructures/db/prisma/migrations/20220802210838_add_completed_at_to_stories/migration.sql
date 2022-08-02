-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "completedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Story_completedAt_idx" ON "Story"("completedAt");
