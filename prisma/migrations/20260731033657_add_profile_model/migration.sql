/*
  Warnings:

  - Made the column `major` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `preferredGym` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "major" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "preferredGym" SET NOT NULL;
