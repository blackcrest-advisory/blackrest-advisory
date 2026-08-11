/*
  Warnings:

  - The values [REJECTED] on the enum `ProposalStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `content` on the `Proposal` table. All the data in the column will be lost.
  - Added the required column `deliverables` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scope` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeline` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProposalStatus_new" AS ENUM ('DRAFT', 'SENT', 'VIEWED', 'ACCEPTED', 'DECLINED', 'EXPIRED');
ALTER TABLE "public"."Proposal" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Proposal" ALTER COLUMN "status" TYPE "ProposalStatus_new" USING ("status"::text::"ProposalStatus_new");
ALTER TYPE "ProposalStatus" RENAME TO "ProposalStatus_old";
ALTER TYPE "ProposalStatus_new" RENAME TO "ProposalStatus";
DROP TYPE "public"."ProposalStatus_old";
ALTER TABLE "Proposal" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterTable
ALTER TABLE "Brief" ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "closedReason" TEXT;

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "content",
ADD COLUMN     "acceptedAt" TIMESTAMP(3),
ADD COLUMN     "clientFeedback" TEXT,
ADD COLUMN     "declinedAt" TIMESTAMP(3),
ADD COLUMN     "declinedReason" TEXT,
ADD COLUMN     "deliverables" TEXT NOT NULL,
ADD COLUMN     "scope" TEXT NOT NULL,
ADD COLUMN     "terms" TEXT,
ADD COLUMN     "timeline" TEXT NOT NULL;
