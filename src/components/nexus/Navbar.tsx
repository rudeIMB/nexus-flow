import { motion } from "framer-motion";
import { Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/60"
    >
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Hexagon className="w-7 h-7 text-accent" strokeWidth={1.5} fill="hsl(var(--accent) / 0.15)" />
            <div className="absolute inset-0 blur-xl bg-accent/30 -z-10" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">Nexus</span>
          <span className="hidden sm:inline text-xs text-muted-foreground font-mono ml-1">/ orchestration</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <button onClick={() => scrollTo("features")} className="hover:text-foreground transition-colors">Features</button>
          <button onClick={() => scrollTo("dashboard")} className="hover:text-foreground transition-colors">Dashboard</button>
          <button onClick={() => scrollTo("privacy")} className="hover:text-foreground transition-colors">Privacy</button>
          <button onClick={() => scrollTo("bundle")} className="hover:text-foreground transition-colors">Bundle</button>
        </nav>
        <Button variant="accent" size="sm" onClick={() => scrollTo("bundle")}>
          Early Access
        </Button>
      </div>
    </motion.header>
  );
};

export default Navbar;