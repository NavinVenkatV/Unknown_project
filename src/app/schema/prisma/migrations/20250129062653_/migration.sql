/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "username" DROP DEFAULT,
ALTER COLUMN "username" SET DATA TYPE TEXT;
DROP SEQUENCE "User_username_seq";

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
