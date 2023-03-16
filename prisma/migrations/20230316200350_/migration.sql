/*
  Warnings:

  - Made the column `userId` on table `Follower` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Following` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_userId_fkey";

-- DropForeignKey
ALTER TABLE "Following" DROP CONSTRAINT "Following_userId_fkey";

-- AlterTable
ALTER TABLE "Follower" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Following" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
