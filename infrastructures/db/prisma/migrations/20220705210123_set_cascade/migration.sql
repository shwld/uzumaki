-- DropForeignKey
ALTER TABLE "AccountMembership" DROP CONSTRAINT "AccountMembership_accountId_fkey";

-- DropForeignKey
ALTER TABLE "AccountMembership" DROP CONSTRAINT "AccountMembership_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_projectId_fkey";

-- DropForeignKey
ALTER TABLE "StoryActivity" DROP CONSTRAINT "StoryActivity_storyId_fkey";

-- DropForeignKey
ALTER TABLE "StoryOrderPriority" DROP CONSTRAINT "StoryOrderPriority_projectId_fkey";

-- DropForeignKey
ALTER TABLE "StoryOrderPriority" DROP CONSTRAINT "StoryOrderPriority_storyId_fkey";

-- AddForeignKey
ALTER TABLE "AccountMembership" ADD CONSTRAINT "AccountMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountMembership" ADD CONSTRAINT "AccountMembership_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryOrderPriority" ADD CONSTRAINT "StoryOrderPriority_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryOrderPriority" ADD CONSTRAINT "StoryOrderPriority_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryActivity" ADD CONSTRAINT "StoryActivity_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
