/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiryTime" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "session" ADD FOREIGN KEY("userId")REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
