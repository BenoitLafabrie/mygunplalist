-- AlterTable
ALTER TABLE `Users` ADD COLUMN `address` VARCHAR(255) NULL,
    ADD COLUMN `city` VARCHAR(255) NULL,
    ADD COLUMN `country` VARCHAR(255) NULL,
    ADD COLUMN `gender` VARCHAR(255) NULL,
    ADD COLUMN `postcode` VARCHAR(255) NULL,
    MODIFY `firstname` VARCHAR(255) NULL,
    MODIFY `lastname` VARCHAR(255) NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);