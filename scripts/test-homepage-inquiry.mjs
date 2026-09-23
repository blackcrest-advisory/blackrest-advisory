// Run with: node scripts/test-homepage-inquiry.mjs
// Exercises the actual TypeScript modules with isolated database/email adapters.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import { createRequire } from "node:module";
const requireModule = createRequire(import.meta.url);

function load(file, mocks = {}, cache = new Map()) {
  const full = path.resolve(file);
  if (cache.has(full)) return cache.get(full);
  const compiled = ts.transpileModule(fs.readFileSync(full, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const loadedModule = { exports: {} };
  cache.set(full, loadedModule.exports);
  vm.runInThisContext(`(function(require,module,exports){${compiled}\n})`, { filename: full })((id) => {
    if (id in mocks) return mocks[id];
    if (id.startsWith("@/")) return load(`${id.slice(2)}.ts`, mocks, cache);
    return requireModule(id);
  }, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}

const { homepageInquirySchema, HOMEPAGE_FORM_PREFIX } = load("lib/validations/homepageInquiry.ts");
const { createHomepageInquiryState } = load("lib/utils/homepageInquiryState.ts");
const visitorId = "b8fe08c5-8a86-4e41-b2de-6ee571a02f40";
const input = {
  visitorId, name: "  Alex Smith  ", email: " ALEX@example.com ",
  companyName: "Example Shop", industry: "Retail & ecommerce", businessStage: "Idea stage",
  need: "business-development", message: "Help me plan my business.",
};

async function main() {
  const valid = homepageInquirySchema.parse(input);
  assert.equal(valid.name, "Alex Smith");
  assert.equal(valid.email, "alex@example.com");
  for (const invalid of [
    { name: "  " }, { email: "invalid" }, { industry: "" }, { businessStage: "" },
    { need: "invalid" }, { visitorId: "bad" }, { websiteConfirm: "spam" }, { message: "x".repeat(2001) },
  ]) assert.equal(homepageInquirySchema.safeParse({ ...input, ...invalid }).success, false);
  assert.equal(homepageInquirySchema.safeParse({ ...input, companyName: "", message: "" }).success, true);

  const memory = new Map([["blackcrest-business-help-popup-seen", "true"]]);
  const storage = { getItem: (key) => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
  const visit = createHomepageInquiryState();
  assert.equal(visit.shouldOpen(storage), true, "Old popup history must not suppress the new form");
  visit.markShown();
  assert.equal(visit.shouldOpen(storage), false, "No repeated popup during client navigation");
  const nextVisit = createHomepageInquiryState();
  assert.equal(nextVisit.shouldOpen(storage), true, "Dismissed visitors see it on a fresh visit/reload");
  nextVisit.markSubmitted(storage);
  assert.equal(createHomepageInquiryState().shouldOpen(storage), false, "Success persists across visits");
  const unavailable = { getItem() { throw Error(); }, setItem() { throw Error(); } };
  const restrictedVisit = createHomepageInquiryState();
  assert.equal(restrictedVisit.shouldOpen(unavailable), true);
  assert.equal(restrictedVisit.visitorId(unavailable), restrictedVisit.visitorId(unavailable));
  restrictedVisit.markSubmitted(unavailable);
  assert.equal(restrictedVisit.shouldOpen(unavailable), false);

  const leads = new Map();
  const events = new Map();
  const callbacks = [];
  const notifications = [];
  let failSave = false, failNotifications = false, failEmail = false, emailCount = 0;
  const prisma = {
    lead: {
      async create({ data }) {
        if (failSave) throw Error("Internal database credentials must not leak");
        if (leads.has(data.id)) throw Object.assign(Error("duplicate"), { code: "P2002" });
        leads.set(data.id, data); return data;
      },
      async findUnique({ where }) { return leads.get(where.id) ?? null; },
      async findMany() { return [...leads.values()]; },
    },
    user: { async findMany() { return [{ id: "admin-1" }]; } },
    notification: { async createMany({ data }) { if (failNotifications) throw Error("notification unavailable"); notifications.push(...data); } },
    popupAnalyticsEvent: {
      async upsert({ create }) { if (!events.has(create.eventKey)) events.set(create.eventKey, create); },
      async findMany() { return [...events.values()]; },
    },
  };
  const mocks = {
    "@/lib/db/client": { prisma },
    "@/lib/utils/admin-utils": { async getAdminUser() { return { id: "admin-1" }; } },
    "next/server": { after(callback) { callbacks.push(callback); } },
    "next/cache": { revalidatePath() {} },
    "@/lib/services/email/email.service": { async sendNewLeadAlert() { emailCount++; if (failEmail) throw Error("email unavailable"); } },
  };
  const { submitHomepageInquiry, recordHomepageFormEvent } = load("lib/actions/leads/homepage-inquiry.action.ts", mocks);
  assert.equal((await submitHomepageInquiry({ ...input, email: "bad" })).success, false);
  assert.equal(leads.size, 0);
  failSave = true;
  const failed = await submitHomepageInquiry(input);
  assert.equal(failed.success, false);
  assert.equal(failed.error.includes("credentials"), false);
  assert.equal(callbacks.length, 0);
  failSave = false;
  const responses = await Promise.all([submitHomepageInquiry(input), submitHomepageInquiry(input)]);
  assert.ok(responses.every((response) => response.success));
  assert.equal(leads.size, 1, "Concurrent requests must create exactly one lead");
  assert.equal(callbacks.length, 1, "Retry must not duplicate notifications");
  const lead = leads.get(HOMEPAGE_FORM_PREFIX + visitorId);
  assert.equal(lead.source, "homepage_enquiry");
  assert.equal(lead.status, "NEW");
  assert.equal(lead.email, "alex@example.com");
  assert.ok(lead.problem.includes("Business stage: Idea stage"));
  assert.equal(JSON.parse(lead.notes).businessStage, "Idea stage");
  await callbacks.shift()();
  assert.equal(notifications.length, 1);
  assert.equal(emailCount, 1);
  assert.equal((await recordHomepageFormEvent({ visitorId, eventType: "SUBMIT" })).success, false, "Clients cannot fabricate submissions");
  await recordHomepageFormEvent({ visitorId, eventType: "VIEW" });
  await recordHomepageFormEvent({ visitorId, eventType: "DISMISS" });
  const secondVisitor = "e97f4250-9964-41cc-a2d9-b18167bca532";
  failNotifications = true; failEmail = true;
  assert.equal((await submitHomepageInquiry({ ...input, visitorId: secondVisitor, need: "not-sure" })).success, true);
  await callbacks.shift()();
  assert.equal(leads.size, 2, "Notification failures cannot undo a saved enquiry");
  assert.deepEqual(leads.get(HOMEPAGE_FORM_PREFIX + secondVisitor).services, []);

  const thirdVisitor = "684dc910-2680-43d3-b931-a89828943f6d";
  await recordHomepageFormEvent({ visitorId: thirdVisitor, eventType: "VIEW" });
  events.set("legacy-view", { eventKey: "legacy-view", visitorId: "old-browser", eventType: "VIEW" });
  events.set("legacy-click", { eventKey: "legacy-click", visitorId: "old-browser", eventType: "OPTION_CLICK", optionId: "website" });
  const { getPopupAnalytics } = load("lib/actions/popup-analytics/popup-analytics.action.ts", mocks);
  const analytics = await getPopupAnalytics();
  assert.equal(analytics.form.totalViews, 3);
  assert.equal(analytics.form.totalSubmissions, 2);
  assert.equal(analytics.form.totalDismissals, 1);
  assert.equal(analytics.form.submissionRate, 66.7);
  assert.equal(analytics.totalViews, 1, "Legacy views stay separate");
  assert.equal(analytics.totalClicks, 1);
  assert.equal(analytics.interests.find((interest) => interest.id === "website").count, 1);
  const unauthorized = load("lib/actions/popup-analytics/popup-analytics.action.ts", {
    ...mocks, "@/lib/utils/admin-utils": { async getAdminUser() { return null; } },
  });
  await assert.rejects(unauthorized.getPopupAnalytics(), /Unauthorized/);
  console.log("PASS: validation, repeat visits, storage fallback, duplicate/retry handling, saved leads, notifications, analytics and admin access.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
