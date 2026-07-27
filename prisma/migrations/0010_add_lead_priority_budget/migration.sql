ALTER TABLE "Lead" ADD COLUMN "priority" TEXT NOT NULL DEFAULT 'medium';
ALTER TABLE "Lead" ADD COLUMN "budget" TEXT;
UPDATE "Lead" SET "services" = ARRAY[]::TEXT[] WHERE "services" IS NULL;
ALTER TABLE "Lead" ALTER COLUMN "services" SET NOT NULL;
