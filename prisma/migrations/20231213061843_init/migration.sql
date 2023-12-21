/*
  Warnings:

  - You are about to drop the column `user_id` on the `recipes` table. All the data in the column will be lost.
  - Added the required column `users_id` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "user_id",
ADD COLUMN     "users_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT,
    "phone" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "Role" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
