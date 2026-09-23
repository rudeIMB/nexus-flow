import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import {
  acceptAdConsent,
  declineAdConsent,
  getAdConsentChoice,
  CONSENT_NOTICE,
} from "@/lib/meta-pixel";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);
    window.addEventListener("nexus:show-consent-banner", show);
    return () => window.removeEventListener("nexus:show-consent-banner", show);
  }, []);

  const decide = (accepted: boolean) => {
    if (accepted) acceptAdConsent();
    else declineAdConsent();
    setVisible(false);
  };

  const current = getAdConsentChoice();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="glass rounded-2xl border border-border p-5 shadow-2xl shadow-background/80">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
                  Privacy &amp; Cookies
                </p>
                <p className="text-sm text-foreground/90 leading-relaxed">{CONSENT_NOTICE}</p>
                {current && (
                  <p className="text-xs text-muted-foreground mt-2 font-mono">
                    Current choice: {current === "accepted" ? "Accepted" : "Declined"}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-2.5">
              <button
                onClick={() => decide(false)}
                className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-surface/80 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => decide(true)}
                className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
