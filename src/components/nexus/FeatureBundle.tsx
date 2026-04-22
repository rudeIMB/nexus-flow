import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { z } from "zod";
import {
  QrCode, ListChecks, Map, Ghost,
  Boxes, Coffee, Maximize2, Wrench,
  EyeOff, ShieldCheck, CalendarOff, Hourglass,
  ConciergeBell, BellRing, FileText,
  TrendingUp, BarChart3, AlertTriangle,
  Database, Server, Webhook,
  Check, Send, Sparkles, Plug, Plus, X, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Feature = { id: string; title: string; desc: string; icon: LucideIcon };
type Category = { id: string; label: string; features: Feature[] };

const categories: Category[] = [
  {
    id: "presence",
    label: "Presence & Access Control",
    features: [
      { id: "qr-checkin", title: "Dynamic QR Check-in", desc: "Unique QR per booking, instant verification.", icon: QrCode },
      { id: "live-attendance", title: "Live Attendance Sheets", desc: "Real-time checked-in vs invited.", icon: ListChecks },
      { id: "wayfinding", title: "Guest Wayfinding", desc: "Auto-sent maps from reception to room.", icon: Map },
      { id: "ghost-release", title: "Ghost-Meeting Release", desc: "Auto-cancel if no QR scan in grace period.", icon: Ghost },
    ],
  },
  {
    id: "resources",
    label: "Smart Resource & Inventory",
    features: [
      { id: "agnostic-assets", title: "Context-Agnostic Assets", desc: "Rooms, desks, vehicles, equipment.", icon: Boxes },
      { id: "consumables", title: "Consumable Tracking", desc: "Water, coffee, tea, catering supplies.", icon: Coffee },
      { id: "capacity-booking", title: "Capacity-Based Booking", desc: "Filter by chairs, projectors, hardware.", icon: Maximize2 },
      { id: "maintenance", title: "Asset Maintenance Logs", desc: "Report issues from the room's page.", icon: Wrench },
    ],
  },
  {
    id: "privacy",
    label: "Availability & Privacy Logic",
    features: [
      { id: "public-private", title: "Public vs. Private Agendas", desc: "Share details — or just appear as Busy.", icon: EyeOff },
      { id: "conflict-prevention", title: "Conflict Prevention Engine", desc: "No double-booking, ever.", icon: ShieldCheck },
      { id: "absence-mgmt", title: "Absence Management", desc: "Sick leave & vacation auto-block.", icon: CalendarOff },
      { id: "buffer-time", title: "Buffer Time Allocation", desc: "Auto cleaning/transition gaps.", icon: Hourglass },
    ],
  },
  {
    id: "ops",
    label: "Operations & Receptionist",
    features: [
      { id: "receptionist-cmd", title: "Receptionist Command Center", desc: "Daily arrivals + redirection.", icon: ConciergeBell },
      { id: "host-alerts", title: "Host Arrival Alerts", desc: "SMS/Push when guest scans in.", icon: BellRing },
      { id: "minutes-archive", title: "Meeting Minutes & Archive", desc: "Templates with privacy tiers.", icon: FileText },
    ],
  },
  {
    id: "analytics",
    label: "Analytics & BI",
    features: [
      { id: "heatmaps", title: "Utilization Heatmaps", desc: "Booked vs underutilized resources.", icon: TrendingUp },
      { id: "stats", title: "Quantifiable Statistics", desc: "Chairs used, liters consumed, hours booked.", icon: BarChart3 },
      { id: "predictive-stock", title: "Predictive Stock Alerts", desc: "Low-inventory alerts by booking volume.", icon: AlertTriangle },
    ],
  },
  {
    id: "integration",
    label: "Integration & Deployment",
    features: [
      { id: "legacy-import", title: "Legacy-to-Cloud Importer", desc: "Migrate from Excel & legacy spreadsheets.", icon: Database },
      { id: "hybrid-deploy", title: "Hybrid Deployment", desc: "On-Premise or Cloud SaaS.", icon: Server },
      { id: "api-webhooks", title: "Universal API/Webhooks", desc: "HR, Slack, building management.", icon: Webhook },
    ],
  },
];

const leadSchema = z.object({
  name: z.string().trim().nonempty({ message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Valid email required" }).max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  useCase: z.string().trim().max(1000).optional().or(z.literal("")),
});

const integrationCatalog: { name: string; category: string }[] = [
  { name: "Google Workspace", category: "Calendar" },
  { name: "Microsoft 365", category: "Calendar" },
  { name: "Outlook", category: "Calendar" },
  { name: "Slack", category: "Comms" },
  { name: "Microsoft Teams", category: "Comms" },
  { name: "Zoom", category: "Video" },
  { name: "Webex", category: "Video" },
  { name: "Okta", category: "SSO" },
  { name: "Azure AD", category: "SSO" },
  { name: "Google SSO", category: "SSO" },
  { name: "BambooHR", category: "HRIS" },
  { name: "Workday", category: "HRIS" },
  { name: "Personio", category: "HRIS" },
  { name: "SAP", category: "ERP" },
  { name: "Salesforce", category: "CRM" },
  { name: "HubSpot", category: "CRM" },
  { name: "Excel / CSV", category: "Migration" },
  { name: "Google Sheets", category: "Migration" },
  { name: "Notion", category: "Docs" },
  { name: "Jira", category: "PM" },
  { name: "ServiceNow", category: "ITSM" },
  { name: "Zapier", category: "Automation" },
  { name: "REST API / Webhooks", category: "Custom" },
];

const FeatureBundle = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", useCase: "" });
  const [selectedIntegrations, setSelectedIntegrations] = useState<Set<string>>(new Set());
  const [customIntegrations, setCustomIntegrations] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");

  const totalCount = useMemo(() => categories.reduce((n, c) => n + c.features.length, 0), []);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleIntegration = (name: string) => {
    setSelectedIntegrations((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const addCustomIntegration = () => {
    const v = customInput.trim();
    if (!v) return;
    if (v.length > 60) {
      toast.error("Tool name too long (max 60 chars).");
      return;
    }
    if (
      customIntegrations.some((c) => c.toLowerCase() === v.toLowerCase()) ||
      integrationCatalog.some((c) => c.name.toLowerCase() === v.toLowerCase())
    ) {
      toast.error("Already in your list.");
      return;
    }
    if (customIntegrations.length >= 10) {
      toast.error("Max 10 custom tools.");
      return;
    }
    setCustomIntegrations([...customIntegrations, v]);
    setCustomInput("");
  };

  const removeCustomIntegration = (name: string) => {
    setCustomIntegrations(customIntegrations.filter((c) => c !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast.success("Request sent — we'll be in touch shortly.");
  };

  return (
    <section id="bundle" className="py-24 sm:py-32 relative scroll-mt-20">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">Build Your Bundle</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            Tell us what matters to your team.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Pick the modules you'd actually use. Your selections shape the early-access rollout.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="absolute -inset-6 bg-gradient-accent opacity-20 blur-3xl rounded-3xl" />
              <div className="relative glass rounded-2xl p-10 md:p-14 text-center shadow-elevated">
                <div className="inline-flex w-16 h-16 rounded-2xl bg-accent items-center justify-center mb-6 shadow-accent">
                  <Check className="w-7 h-7 text-accent-foreground" strokeWidth={2.5} />
                </div>
                <h3 className="font-display text-3xl font-semibold mb-3 text-gradient">
                  Thank you, we'll be in touch!
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your feedback on <span className="text-foreground font-medium">{selected.size} of {totalCount}</span> features has been recorded.
                  We'll reach out within 48 hours with your early-access invitation.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-soft text-xs font-mono text-accent-glow">
                  <Sparkles className="w-3.5 h-3.5" />
                  Cohort confirmed
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {categories.map((cat, ci) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: ci * 0.05 }}
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-mono text-[10px] text-muted-foreground">0{ci + 1}</span>
                    <h3 className="font-display text-xl font-semibold">{cat.label}</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {cat.features.map((f) => {
                      const isOn = selected.has(f.id);
                      return (
                        <button
                          type="button"
                          key={f.id}
                          onClick={() => toggle(f.id)}
                          aria-pressed={isOn}
                          className={`group relative text-left p-4 rounded-xl border transition-all duration-300 ${
                            isOn
                              ? "bg-accent-soft border-accent shadow-accent"
                              : "glass hover:border-border-strong hover:-translate-y-0.5"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              isOn ? "bg-accent text-accent-foreground" : "bg-secondary text-accent-glow"
                            }`}>
                              <f.icon className="w-4 h-4" strokeWidth={1.75} />
                            </div>
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                              isOn ? "bg-accent border-accent" : "border-border group-hover:border-border-strong"
                            }`}>
                              {isOn && <Check className="w-3 h-3 text-accent-foreground" strokeWidth={3} />}
                            </div>
                          </div>
                          <p className="text-sm font-medium leading-tight">{f.title}</p>
                          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Lead form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="relative pt-8"
              >
                <div className="absolute -inset-x-6 -inset-y-2 bg-gradient-accent opacity-10 blur-3xl rounded-3xl -z-10" />
                <div className="glass rounded-2xl p-6 md:p-10 shadow-elevated">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">Your details</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        We use this only to follow up on your early-access request.
                      </p>
                    </div>
                    <div className="font-mono text-xs px-3 py-1.5 rounded-full bg-accent-soft text-accent-glow self-start">
                      {selected.size} / {totalCount} selected
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Name" required error={errors.name}>
                      <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Doe"
                        maxLength={100}
                        className="bg-input border-border h-11"
                      />
                    </Field>
                    <Field label="Email" required error={errors.email}>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@company.io"
                        maxLength={255}
                        className="bg-input border-border h-11"
                      />
                    </Field>
                    <Field label="Phone" hint="optional">
                      <Input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 555 0100"
                        maxLength={40}
                        className="bg-input border-border h-11"
                      />
                    </Field>
                    <Field label="Organization size" hint="optional">
                      <Input
                        placeholder="e.g. 50–200 employees"
                        maxLength={100}
                        className="bg-input border-border h-11"
                      />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="How would you use Nexus?" hint="optional">
                        <Textarea
                          value={form.useCase}
                          onChange={(e) => setForm({ ...form, useCase: e.target.value })}
                          placeholder="Tell us about your spaces, resources, current pain points…"
                          maxLength={1000}
                          rows={4}
                          className="bg-input border-border resize-none"
                        />
                      </Field>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                    <Button type="submit" variant="accent" size="xl" className="group flex-1 sm:flex-initial">
                      Request Early Access & Provide Feedback
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      No spam. We respond within 48 hours.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Field = ({
  label, children, required, hint, error,
}: { label: string; children: React.ReactNode; required?: boolean; hint?: string; error?: string }) => (
  <div className="space-y-2">
    <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
      {label}
      {required && <span className="text-accent">*</span>}
      {hint && <span className="text-[10px] normal-case tracking-normal opacity-60">— {hint}</span>}
    </Label>
    {children}
    {error && <p className="text-xs text-destructive font-mono">{error}</p>}
  </div>
);

export default FeatureBundle;