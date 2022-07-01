/*
  Warnings:

  - You are about to drop the `_AccountToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AccountUserRole" AS ENUM ('OWNER', 'MEMBER', 'VIEWER');

-- DropForeignKey
ALTER TABLE "_AccountToUser" DROP CONSTRAINT "_AccountToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToUser" DROP CONSTRAINT "_AccountToUser_B_fkey";

-- DropTable
DROP TABLE "_AccountToUser";

-- CreateTable
CREATE TABLE "AccountUser" (
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "role" "AccountUserRole" NOT NULL,

    CONSTRAINT "AccountUser_pkey" PRIMARY KEY ("userId","accountId")
);

-- AddForeignKey
ALTER TABLE "AccountUser" ADD CONSTRAINT "AccountUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountUser" ADD CONSTRAINT "AccountUser_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
