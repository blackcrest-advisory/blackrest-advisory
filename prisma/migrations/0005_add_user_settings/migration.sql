ALTER TABLE "User" ADD COLUMN "jobTitle" TEXT;
ALTER TABLE "User" ADD COLUMN "avatarUrl" TEXT;
ALTER TABLE "User" ADD COLUMN "notificationPreferences" JSONB DEFAULT '{"projectUpdates":true,"newMessages":true,"invoiceReminders":true,"fileUploads":false,"marketingEmails":false}';