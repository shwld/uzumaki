-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_boardConfigId_fkey";

-- CreateTable
CREATE TABLE "ProjectBoardStatus" (
    "id" TEXT NOT NULL,
    "velocity" INTEGER NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectBoardStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectBoardStatus_projectId_key" ON "ProjectBoardStatus"("projectId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_boardConfigId_fkey" FOREIGN KEY ("boardConfigId") REFERENCES "ProjectBoardConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectBoardStatus" ADD CONSTRAINT "ProjectBoardStatus_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
