/*
  Warnings:

  - You are about to drop the column `purchase_date` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Picture` MODIFY `updated_at` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `updated_at` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `purchase_date`,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `Variant` MODIFY `updated_at` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `Voucher` MODIFY `updated_at` TIMESTAMP(0) NOT NULL;
