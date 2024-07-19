-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_order_id_fkey`;

-- AlterTable
ALTER TABLE `Ticket` MODIFY `order_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
