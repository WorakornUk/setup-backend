/*
  Warnings:

  - You are about to drop the column `seat_type_id` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_seat_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_user_id_fkey`;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `seat_type_id`,
    MODIFY `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
