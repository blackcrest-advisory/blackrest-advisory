-- CreateEnum
CREATE TYPE "PopupAnalyticsEventType" AS ENUM ('VIEW', 'OPTION_CLICK', 'DISMISS');

-- CreateTable
CREATE TABLE "PopupAnalyticsEvent" (
    "id" TEXT NOT NULL,
    "eventKey" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "eventType" "PopupAnalyticsEventType" NOT NULL,
    "optionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PopupAnalyticsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PopupAnalyticsEvent_eventKey_key" ON "PopupAnalyticsEvent"("eventKey");

-- CreateIndex
CREATE INDEX "PopupAnalyticsEvent_eventType_idx" ON "PopupAnalyticsEvent"("eventType");

-- CreateIndex
CREATE INDEX "PopupAnalyticsEvent_optionId_idx" ON "PopupAnalyticsEvent"("optionId");

-- CreateIndex
CREATE INDEX "PopupAnalyticsEvent_createdAt_idx" ON "PopupAnalyticsEvent"("createdAt");
