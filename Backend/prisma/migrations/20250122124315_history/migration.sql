-- CreateIndex
CREATE INDEX `history_userId_fkey` ON `history`(`userId`);

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `history_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
