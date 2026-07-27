-- Invoice table
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED');

CREATE TABLE "Invoice" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "projectId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "proposalId" TEXT,
  "invoiceNumber" TEXT NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'EUR',
  "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT',
  "dueDate" TIMESTAMP(3),
  "paidAt" TIMESTAMP(3),
  "paymentMethod" TEXT,
  "notes" TEXT,
  "lineItems" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Milestone table
CREATE TABLE "Milestone" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "projectId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "dueDate" TIMESTAMP(3),
  "isCompleted" BOOLEAN NOT NULL DEFAULT false,
  "completedAt" TIMESTAMP(3),
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Notification table
CREATE TYPE "NotificationType" AS ENUM (
  'REQUEST_RECEIVED', 'REQUEST_ASSIGNED',
  'QUOTE_SENT', 'QUOTE_ACCEPTED', 'QUOTE_REJECTED',
  'PROJECT_CREATED', 'MILESTONE_COMPLETED',
  'NEW_MESSAGE', 'INVOICE_SENT', 'INVOICE_PAID'
);

CREATE TABLE "Notification" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  "type" "NotificationType" NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT,
  "link" TEXT,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Business table
CREATE TABLE "Business" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  "businessName" TEXT NOT NULL,
  "industry" TEXT,
  "businessType" TEXT,
  "websiteUrl" TEXT,
  "phone" TEXT,
  "address" TEXT,
  "logoUrl" TEXT,
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Business_userId_key" ON "Business"("userId");

ALTER TABLE "Business" ADD CONSTRAINT "Business_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;