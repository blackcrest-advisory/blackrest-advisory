export function leadDetailsHref(id: string) {
  return `/admin/dashboard/leads/${encodeURIComponent(id)}`;
}

// Next.js route params can retain percent-encoded characters. Database IDs and
// server-action inputs stay unchanged; decode only at the page boundary.
export function leadIdFromRoute(value: string): string | null {
  try {
    return decodeURIComponent(value) || null;
  } catch {
    return null;
  }
}
