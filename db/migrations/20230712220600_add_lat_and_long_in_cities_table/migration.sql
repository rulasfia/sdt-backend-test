/*
  Warnings:

  - Added the required column `latitude` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `cities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cities` ADD COLUMN `latitude` DECIMAL(10, 8) NOT NULL,
    ADD COLUMN `longitude` DECIMAL(11, 8) NOT NULL;
