# Make submission feel instant (and fix two related issues)

## The problem

When someone submits the feedback form, they wait 20–30 seconds on the "Submitting your bundle…" screen. The data arrives correctly — the wait is the page sitting idle while Google Apps Script finishes its work (running the script, writing the row, sending the confirmation email) before the page moves on. On top of that wait, there is an extra 1.1 second animation.

## What changes

1. **Send and continue.** The form sends the data and immediately shows the success screen instead of waiting for Google to finish. The row still lands in the sheet and the confirmation email is still sent.
2. **Short, deliberate transition.** The "Submitting…" screen with its spinner and progress bar stays, but shortened to about 0.6 seconds so it reads as a confident confirmation rather than a delay. Then the success checkmark appears and the Meta Lead event fires.
3. **Network failure handling.** Because the browser cannot read the result of this kind of cross-site send, a genuine failure can't be reported after the fact. If the send can't even start (offline), the visitor sees the existing error message and keeps their filled-in form.

## Two small fixes included

- **Phone number:** the country code is currently chosen but not included in what gets saved — the sheet receives only the local number. It will save the full number with the code (for example `+213 5 55 12 34 56`).
- **Consent banner region:** on the live domain the region check has no answer, so every visitor is treated as "consent required" — which is why the banner appeared for you in Algeria. It will default to tracking normally when the region is unknown, and show the banner only for the EEA, UK and Switzerland. Saudi and Algerian visitors will not see it.

## Notes

- Brave blocks Meta's pixel by default. Test in Chrome or Edge (no ad blocker) when checking Meta Test Events.
- Nothing about the form's look, fields, or preselected cards changes.

## Technical detail

- `src/components/nexus/FeatureBundle.tsx`: drop `await` on the Apps Script `fetch` (fire-and-forget with a `.catch` that logs), wrap in try/catch only for synchronous failures, reduce the success `setTimeout` to ~600ms and the progress-bar animation duration to match; send `fullPhone` instead of `form.phone`.
- `src/lib/meta-pixel.ts`: region lookup failure / `XX` / `T1` no longer forces consent; `needsConsent` becomes `CONSENT_REGIONS.has(region)` only. Stored accept/decline behaviour unchanged, and the footer "Cookie settings" entry point stays.
