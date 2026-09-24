// Meta Pixel — consent-aware loader.
// The pixel is only initialized when tracking is permitted:
// - Visitors outside consent regions: init + PageView immediately.
// - Visitors in consent regions (EEA, UK, CH): nothing is initialized until they
//   accept in the banner. Declining keeps it fully off.
// The choice is persisted in localStorage and can be changed anytime via the
// footer's "Cookie settings" link.

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

let scriptLoaded = false;
let pixelActive = false;

function injectScript() {
  if (scriptLoaded) return;
  scriptLoaded = true;

  // Official Meta pixel stub.
  const f = window as unknown as Record<string, any>;
  if (!f.fbq) {
    const n: any = (f.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = document.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    const s = document.getElementsByTagName("script")[0];
    s.parentNode?.insertBefore(t, s);
  }
}

function activatePixel() {
  if (pixelActive) return;
  pixelActive = true;
  injectScript();
  window.fbq!("init", PIXEL_ID);
  window.fbq!("track", "PageView");
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
    const loc = text.match(/^loc=([A-Z0-9]{2})$/m)?.[1] ?? "XX";
    sessionStorage.setItem(REGION_KEY, loc);
    return loc;
  } catch {
    // On failure/timeout the region is unknown ("XX") — not a consent region.
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

/** Call once at app start. Resolves region + stored consent, fires PageView when allowed. */
export async function initMetaPixel() {
  const region = await detectRegion();
  // Only EEA / UK / CH visitors need explicit opt-in. When the region cannot be
  // determined (e.g. no /cdn-cgi/trace on the host), track normally.
  const needsConsent = CONSENT_REGIONS.has(region);

  if (!needsConsent) {
    activatePixel();
    return;
  }

  const choice = getAdConsentChoice();
  if (choice === "accepted") {
    activatePixel();
    return;
  }
  if (choice === "declined") return;

  window.dispatchEvent(new CustomEvent("nexus:show-consent-banner"));
}

/** Visitor accepted in the banner. */
export function acceptAdConsent() {
  persistChoice("accepted");
  activatePixel();
}

/** Visitor declined in the banner. */
export function declineAdConsent() {
  persistChoice("declined");
  pixelActive = false;
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

/** Fire a Lead event — only when tracking is active. */
export function trackLead() {
  if (!pixelActive || !window.fbq) return;
  window.fbq("track", "Lead");
}

/** Re-open the consent banner (footer "Cookie settings"). */
export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent("nexus:show-consent-banner"));
}
