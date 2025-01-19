/*
  Warnings:

  - Added the required column `name` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `campaign` ADD COLUMN `name` VARCHAR(25) NOT NULL;
