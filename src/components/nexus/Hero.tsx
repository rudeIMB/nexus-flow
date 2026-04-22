import { motion } from "framer-motion";
import { ArrowRight, QrCode, Coffee, Car, Users, Calendar, MapPin, Activity, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToBundle = () => {
    document.getElementById("bundle")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Floating tokens */}
      <FloatingToken icon={QrCode} className="top-32 left-[8%] hidden lg:flex" delay={0.3} />
      <FloatingToken icon={Coffee} className="top-48 right-[10%] hidden lg:flex" delay={0.5} />
      <FloatingToken icon={Car} className="bottom-40 left-[12%] hidden lg:flex" delay={0.7} />
      <FloatingToken icon={MapPin} className="bottom-32 right-[8%] hidden lg:flex" delay={0.9} />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
            v1.0 — Early access cohort open
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[0.95] tracking-tight text-center max-w-5xl mx-auto"
        >
          <span className="text-gradient">Any Space.</span>{" "}
          <span className="text-gradient">Any Resource.</span>
          <br />
          <span className="text-gradient-accent">One Unified Flow.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl mx-auto text-center text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          From meeting rooms and guest receptions to equipment tracking and presence verification.
          A headless orchestration engine that evolves with your organization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="accent" size="xl" onClick={scrollToBundle} className="group">
            Build Your Custom Solution
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="ghost-glass" size="xl" onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}>
            See Receptionist View
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden glass max-w-4xl mx-auto"
        >
          {[
            { icon: Users, label: "Resources tracked", value: "∞" },
            { icon: Activity, label: "Real-time presence", value: "QR" },
            { icon: Calendar, label: "Conflict prevention", value: "100%" },
            { icon: Coffee, label: "Consumables", value: "Auto" },
          ].map((s, i) => (
            <div key={i} className="bg-surface/40 p-5 flex flex-col items-center gap-1">
              <s.icon className="w-4 h-4 text-accent mb-1" strokeWidth={1.5} />
              <div className="font-display text-2xl font-semibold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FloatingToken = ({
  icon: Icon,
  className,
  delay,
}: {
  icon: LucideIcon;
  className?: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute z-10 ${className}`}
  >
    <div className="relative animate-float" style={{ animationDelay: `${delay}s` }}>
      <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center shadow-elevated">
        <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0 blur-2xl bg-accent/20 -z-10" />
    </div>
  </motion.div>
);

export default Hero;