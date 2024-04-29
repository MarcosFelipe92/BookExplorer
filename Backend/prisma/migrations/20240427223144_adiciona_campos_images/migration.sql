/*
  Warnings:

  - Added the required column `smallThumbnail` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `smallThumbnail` VARCHAR(191) NOT NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL;
