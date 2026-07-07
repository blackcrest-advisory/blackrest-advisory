-- Enums
CREATE TYPE "Role" AS ENUM ('CLIENT', 'ADMIN', 'SUPER_ADMIN');
CREATE TYPE "Pillar" AS ENUM ('DIGITAL_MARKETING', 'WEBSITE_DEVELOPMENT', 'MOBILE_APP', 'SALES_SUPPORT', 'MIXED');
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST');
CREATE TYPE "ConsultationType" AS ENUM ('ONLINE', 'OFFLINE', 'PHONE');
CREATE TYPE "ConsultationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "BriefStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'CLOSED');
CREATE TYPE "ProposalStatus" AS ENUM ('DRAFT', 'SENT', 'VIEWED', 'ACCEPTED', 'REJECTED');
CREATE TYPE "ProjectStatus" AS ENUM ('ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED');
CREATE TYPE "NoteEntityType" AS ENUM ('LEAD', 'USER', 'BRIEF', 'PROJECT');

-- Tables
CREATE TABLE "User" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT,
  "role" "Role" NOT NULL DEFAULT 'CLIENT',
  "companyName" TEXT,
  "phone" TEXT,
  "country" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE TABLE "Lead" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "companyName" TEXT,
  "pillar" "Pillar",
  "problem" TEXT NOT NULL,
  "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
  "source" TEXT,
  "assignedTo" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Consultation" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  "type" "ConsultationType" NOT NULL DEFAULT 'ONLINE',
  "status" "ConsultationStatus" NOT NULL DEFAULT 'PENDING',
  "scheduledAt" TIMESTAMP(3) NOT NULL,
  "duration" INTEGER,
  "notes" TEXT,
  "meetingLink" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Brief" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "problem" TEXT NOT NULL,
  "pillar" "Pillar" NOT NULL,
  "budget" TEXT,
  "deadline" TEXT,
  "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "status" "BriefStatus" NOT NULL DEFAULT 'SUBMITTED',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Brief_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Proposal" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "briefId" TEXT NOT NULL,
  "adminId" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "amount" DOUBLE PRECISION,
  "currency" TEXT NOT NULL DEFAULT 'EUR',
  "status" "ProposalStatus" NOT NULL DEFAULT 'DRAFT',
  "sentAt" TIMESTAMP(3),
  "viewedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Proposal_briefId_key" ON "Proposal"("briefId");

CREATE TABLE "Project" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "proposalId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "status" "ProjectStatus" NOT NULL DEFAULT 'ACTIVE',
  "deadline" TIMESTAMP(3),
  "assignedTo" TEXT,
  "description" TEXT,
  "updates" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Project_proposalId_key" ON "Project"("proposalId");

CREATE TABLE "Note" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "authorId" TEXT NOT NULL,
  "entityType" "NoteEntityType" NOT NULL,
  "entityId" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Partner" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "specialty" "Pillar" NOT NULL,
  "contactEmail" TEXT NOT NULL,
  "phone" TEXT,
  "website" TEXT,
  "notes" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- Foreign Keys
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Brief" ADD CONSTRAINT "Brief_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_briefId_fkey" FOREIGN KEY ("briefId") REFERENCES "Brief"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON UPDATE CASCADE;
ALTER TABLE "Project" ADD CONSTRAINT "Project_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON UPDATE CASCADE;
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Note" ADD CONSTRAINT "Note_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON UPDATE CASCADE;