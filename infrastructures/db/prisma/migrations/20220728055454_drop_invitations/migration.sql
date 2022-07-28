/*
  Warnings:

  - You are about to drop the `ProjectMemberInvitation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `state` to the `ProjectMembership` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectMemberState" AS ENUM ('INVITING', 'JOINED');

-- DropForeignKey
ALTER TABLE "ProjectMemberInvitation" DROP CONSTRAINT "ProjectMemberInvitation_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMemberInvitation" DROP CONSTRAINT "ProjectMemberInvitation_projectId_fkey";

-- AlterTable
ALTER TABLE "ProjectMembership" ADD COLUMN     "state" "ProjectMemberState" NOT NULL;

-- DropTable
DROP TABLE "ProjectMemberInvitation";
