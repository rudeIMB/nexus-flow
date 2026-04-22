import { motion } from "framer-motion";
import { CheckCircle2, Clock, ArrowRight, Bell, Search, Calendar, Users, MoreHorizontal } from "lucide-react";

const guests = [
  { name: "Amelia Rousseau", company: "Stripe", host: "M. Diallo", room: "Atrium 4F", time: "10:00", status: "checked-in" as const },
  { name: "Jonas Brandt", company: "Acme Industries", host: "S. Patel", room: "Vault 2B", time: "10:30", status: "redirected" as const },
  { name: "Yuki Tanaka", company: "Nomura Lab", host: "L. Chen", room: "Tide Room", time: "11:00", status: "expected" as const },
  { name: "Marco Iqbal", company: "Vela", host: "R. Okafor", host2: true, room: "Atrium 4F", time: "11:15", status: "expected" as const },
];

const statusMap = {
  "checked-in": { label: "Checked in", color: "text-success", dot: "bg-success" },
  "redirected": { label: "Redirected", color: "text-warning", dot: "bg-warning" },
  "expected": { label: "Expected", color: "text-muted-foreground", dot: "bg-muted-foreground" },
};

const ReceptionistView = () => {
  return (
    <section id="dashboard" className="py-24 sm:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">Receptionist Command Center</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            One screen. Every arrival accounted for.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Front-desk staff see today's guests, room redirections, and host alerts in one quiet, organized stream.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute -inset-4 bg-gradient-accent opacity-20 blur-3xl rounded-3xl" />

          <div className="relative glass rounded-2xl overflow-hidden shadow-elevated">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-elevated/40">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <span className="ml-4 text-xs font-mono text-muted-foreground">nexus.app / reception</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <Search className="w-3.5 h-3.5" />
                <Bell className="w-3.5 h-3.5" />
                <div className="w-7 h-7 rounded-full bg-accent/30 border border-accent/50" />
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_280px]">
              {/* Main */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold">Today's Guests</h3>
                    <p className="text-xs text-muted-foreground font-mono mt-1">Tuesday · 4 expected · 1 in building</p>
                  </div>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-accent text-accent-foreground font-medium">
                    + New arrival
                  </button>
                </div>

                <div className="space-y-2">
                  {guests.map((g, i) => {
                    const s = statusMap[g.status];
                    return (
                      <motion.div
                        key={g.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="group flex items-center gap-4 px-4 py-3.5 rounded-xl bg-surface/60 hover:bg-surface-elevated/80 border border-border/50 hover:border-border-strong transition-all"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center font-mono text-xs font-semibold text-accent-foreground shrink-0">
                          {g.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <p className="font-medium truncate">{g.name}</p>
                            <p className="text-xs text-muted-foreground truncate">· {g.company}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                            Host {g.host} → {g.room}
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {g.time}
                        </div>
                        <div className={`flex items-center gap-1.5 text-xs ${s.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${g.status === 'checked-in' ? 'animate-pulse-glow' : ''}`} />
                          <span className="hidden md:inline">{s.label}</span>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Side panel */}
              <div className="border-t lg:border-t-0 lg:border-l border-border bg-surface/40 p-6 space-y-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">Live activity</p>
                  <div className="space-y-3">
                    <ActivityItem icon={CheckCircle2} text="Amelia checked in" sub="QR · Atrium 4F · just now" success />
                    <ActivityItem icon={ArrowRight} text="Jonas redirected" sub="Vault 2A → 2B (capacity)" />
                    <ActivityItem icon={Bell} text="Host alert sent" sub="M. Diallo · push + SMS" />
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">Room load</p>
                  <div className="space-y-2.5">
                    <RoomBar name="Atrium 4F" pct={75} />
                    <RoomBar name="Vault 2B" pct={45} />
                    <RoomBar name="Tide Room" pct={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ActivityItem = ({
  icon: Icon,
  text,
  sub,
  success,
}: { icon: React.ComponentType<{ className?: string }>; text: string; sub: string; success?: boolean }) => (
  <div className="flex gap-2.5">
    <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${success ? 'text-success' : 'text-accent'}`} />
    <div>
      <p className="text-xs font-medium">{text}</p>
      <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{sub}</p>
    </div>
  </div>
);

const RoomBar = ({ name, pct }: { name: string; pct: number }) => (
  <div>
    <div className="flex justify-between text-[11px] font-mono mb-1">
      <span className="text-muted-foreground">{name}</span>
      <span>{pct}%</span>
    </div>
    <div className="h-1 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-full bg-gradient-accent"
      />
    </div>
  </div>
);

export default ReceptionistView;