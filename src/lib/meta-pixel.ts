// Meta Pixel — consent-aware loader.
// Default: consent revoked everywhere until we know the visitor's region.
// Non-consent regions: consent granted automatically, PageView fires.
// Consent regions (EEA, UK, CH): pixel stays blocked until the visitor accepts
// via the banner. Their choice is persisted in localStorage.

const PIXEL_ID = "1674158737466387";
const CONSENT_KEY = "nexus-ad-consent";
const REGION_KEY = "nexus-region";

// Regions where ad tracking requires explicit opt-in.
const CONSENT_REGIONS = new Set([
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IE",
  "IT","LV","LI","LT","LU","MT","NL","NO","PL","PT","RO","SK","SI","ES","SE",
  "GB","CH",
]);

export const CONSENT_NOTICE =
  "We use the Meta Pixel (Meta Platforms, Inc.) to measure visits and form submissions for ad measurement and optimization. You can accept or decline, and change your choice anytime via Cookie settings in the footer.";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

let initialized = false;
let consentGranted = false;

function loadPixel() {
  if (initialized) return;
  initialized = true;

  // Official Meta pixel snippet.
  const f = window as unknown as Record<string, any>;
  const b = document;
  if (!f.fbq) {
    const n: any = (f.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    const s = b.getElementsByTagName("script")[0];
    s.parentNode?.insertBefore(t, s);
  }
  // Deny by default until region/consent is resolved.
  window.fbq!("consent", "revoke");
  window.fbq!("init", PIXEL_ID);
}

async function detectRegion(): Promise<string> {
  const cached = sessionStorage.getItem(REGION_KEY);
  if (cached) return cached;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2000);
    const res = await fetch("/cdn-cgi/trace", { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error("region lookup failed");
    const text = await res.text();
    const loc = text.match(/^loc=(.+)$/m)?.[1]?.trim() ?? "XX";
    sessionStorage.setItem(REGION_KEY, loc);
    return loc;
  } catch {
    // On failure/timeout, treat as consent-required (safe default).
    sessionStorage.setItem(REGION_KEY, "XX");
    return "XX";
  }
}

function persistChoice(choice: "accepted" | "declined") {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({
      choice,
      at: new Date().toISOString(),
      notice: CONSENT_NOTICE,
    })
  );
}

function grantAndTrack() {
  consentGranted = true;
  window.fbq!("consent", "grant");
  window.fbq!("track", "PageView");
}

/** Call once at app start. Resolves region + stored consent, fires PageView when allowed. */
export async function initMetaPixel() {
  loadPixel();
  const region = await detectRegion();
  // Unknown (XX) or Tor (T1) regions are treated as consent-required.
  const needsConsent = CONSENT_REGIONS.has(region) || region === "XX" || region === "T1";

  if (!needsConsent) {
    grantAndTrack();
    return;
  }

  // Consent region: only a stored acceptance lifts the denial.
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored) {
    try {
      const { choice } = JSON.parse(stored);
      if (choice === "accepted") {
        grantAndTrack();
        return;
      }
      if (choice === "declined") return;
    } catch {
      /* fall through to banner */
    }
  }
  window.dispatchEvent(new CustomEvent("nexus:show-consent-banner"));
}

/** Visitor accepted in the banner. */
export function acceptAdConsent() {
  persistChoice("accepted");
  grantAndTrack();
}

/** Visitor declined in the banner. */
export function declineAdConsent() {
  persistChoice("declined");
  consentGranted = false;
  window.fbq?.("consent", "revoke");
}

/** Current stored choice, if any. */
export function getAdConsentChoice(): "accepted" | "declined" | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const { choice } = JSON.parse(raw);
    return choice === "accepted" || choice === "declined" ? choice : null;
  } catch {
    return null;
  }
}

/** Fire a Lead event — only when tracking is permitted. */
export function trackLead() {
  if (!consentGranted || !window.fbq) return;
  window.fbq("track", "Lead");
}

/** Re-open the consent banner (footer "Cookie settings"). */
export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent("nexus:show-consent-banner"));
}
