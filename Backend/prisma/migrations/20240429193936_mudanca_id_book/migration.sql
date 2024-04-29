/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `authors` DROP FOREIGN KEY `authors_bookId_fkey`;

-- AlterTable
ALTER TABLE `authors` MODIFY `bookId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `books` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `authors` ADD CONSTRAINT `authors_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
