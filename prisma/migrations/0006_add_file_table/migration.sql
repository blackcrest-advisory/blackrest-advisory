CREATE TABLE "File" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "projectId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "extension" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'other',
  "sizeInBytes" INTEGER NOT NULL DEFAULT 0,
  "uploadedBy" TEXT NOT NULL,
  "uploadedByRole" TEXT NOT NULL DEFAULT 'client',
  "path" TEXT NOT NULL,
  "downloadUrl" TEXT NOT NULL,
  "previewUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "File" ADD CONSTRAINT "File_projectId_fkey" 
  FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" 
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;