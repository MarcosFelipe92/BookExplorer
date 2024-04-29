-- DropForeignKey
ALTER TABLE `authors` DROP FOREIGN KEY `authors_bookId_fkey`;

-- AlterTable
ALTER TABLE `authors` MODIFY `bookId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `authors` ADD CONSTRAINT `authors_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
