import { Link } from "react-router-dom";
import { Hexagon, ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-3xl py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Nexus
        </Link>

        <div className="flex items-center gap-2.5 mb-8">
          <Hexagon className="w-7 h-7 text-accent" strokeWidth={1.5} fill="hsl(var(--accent) / 0.15)" />
          <span className="font-display text-lg font-semibold tracking-tight">Nexus</span>
        </div>

        <h1 className="font-display text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
          Last updated · September 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/85">
          <section>
            <h2 className="font-display text-lg font-semibold mb-2">What we collect</h2>
            <p>
              When you submit the feedback form, we collect the details you provide: your name, work
              email, phone number (optional), use case, and the features and integrations you select.
              We use this solely to understand interest in Nexus and to contact you about it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-2">Advertising measurement (Meta Pixel)</h2>
            <p>
              This site uses the Meta Pixel, provided by Meta Platforms, Inc., for two purposes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Measurement</strong> — counting page visits and form submissions so we know how our ads perform.</li>
              <li><strong>Ad optimization</strong> — helping Meta show our ads to people more likely to be interested.</li>
            </ul>
            <p className="mt-2">
              The pixel reports page views and lead events (form submissions) to Meta. No form field
              contents (name, email, phone) are sent to Meta through the pixel.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-2">Your consent choices</h2>
            <p>
              Visitors in the EEA, UK, and Switzerland are asked for consent before any ad tracking
              runs. Accepting enables the Meta Pixel; declining keeps it fully off. Outside these
              regions, basic measurement runs without a banner.
            </p>
            <p className="mt-2">
              You can change your choice at any time via the <strong>Cookie settings</strong> link in
              the footer. Changes apply immediately — declining stops all further ad tracking on this
              device.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-2">Data recipients</h2>
            <p>
              Form submissions are delivered to the Nexus team. Ad measurement events are processed
              by Meta Platforms, Inc. We do not sell your data to anyone.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-2">Contact</h2>
            <p>
              Questions about this policy or your data? Reach out through the feedback form on the
              homepage and we'll respond promptly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
