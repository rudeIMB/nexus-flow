import { Hexagon, Cloud, Server, Github, Twitter, Linkedin, type LucideIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface/40 mt-12">
      <div className="container py-16">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Hexagon className="w-7 h-7 text-accent" strokeWidth={1.5} fill="hsl(var(--accent) / 0.15)" />
              <span className="font-display text-lg font-semibold tracking-tight">Nexus</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              A headless orchestration engine for any space, any resource. Built for organizations that outgrew calendars.
            </p>

            <div className="mt-6 flex gap-2">
              <DeployBadge icon={Cloud} label="SaaS" sub="Cloud-hosted" />
              <DeployBadge icon={Server} label="On-Premise" sub="Self-hosted" />
            </div>
          </div>

          <FooterCol title="Product" items={["Features", "Receptionist View", "Privacy Tiers", "Integrations", "Roadmap"]} />
          <FooterCol title="Company" items={["About", "Pricing", "Customers", "Changelog", "Press"]} />
          <FooterCol title="Legal" items={["Privacy Policy", "Terms of Service", "GDPR", "Security", "Cookies"]} />
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs font-mono text-muted-foreground">
            © 2026 Nexus Orchestration · All rights reserved
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-foreground transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">{title}</h4>
    <ul className="space-y-2.5">
      {items.map((i) => (
        <li key={i}>
          <a href="#" className="text-sm hover:text-accent-glow transition-colors">{i}</a>
        </li>
      ))}
    </ul>
  </div>
);

const DeployBadge = ({
  icon: Icon, label, sub,
}: { icon: LucideIcon; label: string; sub: string }) => (
  <div className="glass rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
    <Icon className="w-4 h-4 text-accent" strokeWidth={1.75} />
    <div>
      <p className="text-xs font-medium leading-tight">{label}</p>
      <p className="text-[10px] text-muted-foreground font-mono leading-tight mt-0.5">{sub}</p>
    </div>
  </div>
);

export default Footer;