/*
  Warnings:

  - You are about to drop the column `image` on the `vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `image`;

-- RenameIndex
ALTER TABLE `vehicle` RENAME INDEX `Vehicle_plate_key` TO `vehicle_plate_key`;
