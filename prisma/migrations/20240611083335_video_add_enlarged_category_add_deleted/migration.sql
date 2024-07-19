-- AlterTable
ALTER TABLE `Category` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Video` ADD COLUMN `enlarged` BOOLEAN NOT NULL DEFAULT false;
