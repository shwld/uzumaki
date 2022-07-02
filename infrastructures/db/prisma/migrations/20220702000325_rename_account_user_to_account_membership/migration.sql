/*
  Warnings:

  - You are about to drop the `AccountUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AccountRole" AS ENUM ('OWNER', 'MEMBER', 'VIEWER');

-- DropForeignKey
ALTER TABLE "AccountUser" DROP CONSTRAINT "AccountUser_accountId_fkey";

-- DropForeignKey
ALTER TABLE "AccountUser" DROP CONSTRAINT "AccountUser_userId_fkey";

-- DropTable
DROP TABLE "AccountUser";

-- DropEnum
DROP TYPE "AccountUserRole";

-- CreateTable
CREATE TABLE "AccountMembership" (
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "role" "AccountRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountMembership_pkey" PRIMARY KEY ("userId","accountId")
);

-- AddForeignKey
ALTER TABLE "AccountMembership" ADD CONSTRAINT "AccountMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountMembership" ADD CONSTRAINT "AccountMembership_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
