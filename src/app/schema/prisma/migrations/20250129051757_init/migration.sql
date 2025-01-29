-- CreateTable
CREATE TABLE "User" (
    "username" SERIAL NOT NULL,
    "password" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
