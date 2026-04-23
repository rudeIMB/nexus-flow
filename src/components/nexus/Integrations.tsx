import { motion } from "framer-motion";
import { ArrowRight, Database, FileSpreadsheet, Plug, Shuffle } from "lucide-react";
import IntegrationIcon from "./IntegrationIcon";

type Integration = { name: string; category: string };

const integrations: Integration[] = [
  { name: "Google Workspace", category: "Calendar" },
  { name: "Microsoft 365", category: "Calendar" },
  { name: "Outlook", category: "Calendar" },
  { name: "Slack", category: "Comms" },
  { name: "Microsoft Teams", category: "Comms" },
  { name: "Zoom", category: "Video" },
  { name: "Webex", category: "Video" },
  { name: "Okta", category: "SSO" },
  { name: "Azure AD", category: "SSO" },
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

const migrationSteps = [
  { icon: FileSpreadsheet, label: "Excel / Legacy", desc: "Drop your existing files." },
  { icon: Shuffle, label: "Smart Mapper", desc: "Auto-detects rooms, assets, users." },
  { icon: Database, label: "Live in Nexus", desc: "Validated, deduped, ready." },
];

const Integrations = () => {
  return (
    <section id="integrations" className="py-24 sm:py-32 relative scroll-mt-20">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Plug & Play
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            Works with the stack you already run.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Native connectors for calendars, identity, HRIS, and comms — plus a universal
            API and a migration engine that lifts your legacy spreadsheets into production
            in minutes, not weeks.
          </p>
        </motion.div>

        {/* Migration flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 md:p-10 mb-12 shadow-elevated"
        >
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-glow mb-2">
                Legacy → Cloud
              </p>
              <h3 className="font-display text-2xl font-semibold">Zero-friction migration</h3>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              avg. import time: ~12 min
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-2 items-stretch">
            {migrationSteps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-4 md:gap-2">
                <div className="flex-1 p-5 rounded-xl bg-secondary/40 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-accent-soft text-accent-glow flex items-center justify-center mb-3">
                    <s.icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <p className="font-medium text-sm">{s.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                </div>
                {i < migrationSteps.length - 1 && (
                  <ArrowRight className="hidden md:block w-4 h-4 text-accent-glow shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Logo grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="font-display text-xl font-semibold">Native connectors</h3>
            <a
              href="#bundle"
              className="font-mono text-xs text-accent-glow hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              Don't see yours? Tell us <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {integrations.map((it, i) => (
              <motion.div
                key={it.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="group glass rounded-xl p-4 hover:border-border-strong hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/60 flex items-center justify-center group-hover:bg-accent-soft transition-colors shrink-0">
                    <IntegrationIcon name={it.name} size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{it.name}</p>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {it.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <Plug className="w-4 h-4 text-accent-glow" />
            <span>
              Plus a universal REST API & webhooks for anything custom.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Integrations;
