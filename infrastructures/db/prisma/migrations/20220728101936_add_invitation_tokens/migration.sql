-- CreateTable
CREATE TABLE "ProjectMemberInvitationToken" (
    "id" TEXT NOT NULL,
    "invitationId" TEXT NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectMemberInvitationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProjectMemberInvitation_membershipId_projectId_idx" ON "ProjectMemberInvitation"("membershipId", "projectId");

-- AddForeignKey
ALTER TABLE "ProjectMemberInvitationToken" ADD CONSTRAINT "ProjectMemberInvitationToken_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "ProjectMemberInvitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
