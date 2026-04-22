import { motion } from "framer-motion";
import { ScanLine, Boxes, Layers } from "lucide-react";

const props = [
  {
    icon: ScanLine,
    title: "Presence-First",
    desc: "QR-based check-ins and real-time attendance sheets. Verify who actually showed up — not who said they would.",
    accent: "Verification layer",
  },
  {
    icon: Boxes,
    title: "Resource Intelligence",
    desc: "Track consumables (water, coffee), inventory, and hardware capacity. Predictive alerts when stock runs low.",
    accent: "Inventory engine",
  },
  {
    icon: Layers,
    title: "Total Abstraction",
    desc: "Designed to manage rooms today, scalable to vehicles, equipment, or medical appointments tomorrow.",
    accent: "Domain-agnostic",
  },
];

const ValueProps = () => {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">Why Nexus</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            Three primitives. Infinite combinations.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {props.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative glass rounded-2xl p-8 hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-accent opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex w-12 h-12 rounded-xl bg-accent-soft items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <p.icon className="w-5 h-5 text-accent-glow" strokeWidth={1.75} />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  {p.accent}
                </p>
                <h3 className="font-display text-2xl font-semibold mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;