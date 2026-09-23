export const INQUIRY_SUBMITTED_KEY = "blackcrest-homepage-enquiry-submitted-v1";
const VISITOR_KEY = "blackcrest-popup-visitor-id";

// One automatic display per page load. Client-side navigation shares this state;
// a fresh visit/reload starts again unless the enquiry was submitted.
export function createHomepageInquiryState() {
  let shown = false;
  let submitted = false;
  let visitorId: string | undefined;

  return {
    hasSubmitted(storage?: Pick<Storage, "getItem">) {
      try {
        submitted ||= storage?.getItem(INQUIRY_SUBMITTED_KEY) === "true";
      } catch { /* Use memory if browser storage is unavailable. */ }
      return submitted;
    },
    shouldOpen(storage?: Pick<Storage, "getItem">) {
      return !this.hasSubmitted(storage) && !shown;
    },
    markShown() { shown = true; },
    markSubmitted(storage?: Pick<Storage, "setItem">) {
      submitted = true;
      shown = true;
      try { storage?.setItem(INQUIRY_SUBMITTED_KEY, "true"); } catch { /* Memory fallback. */ }
    },
    visitorId(storage?: Pick<Storage, "getItem" | "setItem">) {
      if (visitorId) return visitorId;
      try {
        const saved = storage?.getItem(VISITOR_KEY);
        if (saved && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(saved)) {
          visitorId = saved;
          return visitorId;
        }
      } catch { /* Memory fallback. */ }
      visitorId = crypto.randomUUID();
      try { storage?.setItem(VISITOR_KEY, visitorId); } catch { /* Memory fallback. */ }
      return visitorId;
    },
  };
}
