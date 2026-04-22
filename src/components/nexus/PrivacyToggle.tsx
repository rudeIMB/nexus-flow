import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, Lock, Calendar, Users, MapPin } from "lucide-react";

const PrivacyToggle = () => {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <section id="privacy" className="py-24 sm:py-32 relative">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">Public vs. Private agenda</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient leading-[1.05]">
              Share the room.
              <br />
              Keep the context.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Toggle between sharing full meeting details with your team or simply appearing as <span className="font-mono text-foreground">"Busy"</span>.
              Each event carries its own privacy tier — from open agendas to fully redacted blocks.
            </p>

            <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-full glass">
              <button
                onClick={() => setIsPublic(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isPublic ? "bg-accent text-accent-foreground shadow-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Public
              </button>
              <button
                onClick={() => setIsPublic(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  !isPublic ? "bg-accent text-accent-foreground shadow-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <EyeOff className="w-3.5 h-3.5" />
                Private
              </button>
            </div>

            <div className="mt-8 flex items-start gap-3 text-sm text-muted-foreground">
              <Lock className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
              <p>
                Privacy tiers extend to meeting minutes & archives — sensitive sessions stay sealed even after they end.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-accent opacity-15 blur-3xl rounded-3xl" />
            <div className="relative glass rounded-2xl p-6 shadow-elevated">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <div>
                  <p className="font-display text-base font-semibold">Tuesday — Calendar view</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">colleague@org.io</p>
                </div>
                <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${isPublic ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'}`}>
                  {isPublic ? 'TRANSPARENT' : 'OBFUSCATED'}
                </span>
              </div>

              <div className="space-y-2.5">
                <EventBlock isPublic={isPublic} time="09:30" title="Q3 Roadmap Sync" attendees={6} room="Atrium 4F" />
                <EventBlock isPublic={isPublic} time="11:00" title="1:1 — Performance review" attendees={2} room="Vault 2B" sensitive />
                <EventBlock isPublic={isPublic} time="14:00" title="Customer call: Helix Corp" attendees={4} room="Tide Room" />
                <EventBlock isPublic={isPublic} time="16:30" title="Engineering retro" attendees={9} room="Atrium 4F" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const EventBlock = ({
  isPublic,
  time,
  title,
  attendees,
  room,
  sensitive,
}: { isPublic: boolean; time: string; title: string; attendees: number; room: string; sensitive?: boolean }) => {
  const hidden = !isPublic || (isPublic && sensitive);
  return (
    <div className="flex gap-4 p-3.5 rounded-xl bg-surface/60 border border-border/50 hover:border-border-strong transition-all">
      <div className="font-mono text-xs text-muted-foreground pt-0.5 w-12 shrink-0">{time}</div>
      <div className="flex-1 min-w-0">
        <motion.p
          key={`${hidden}-${title}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`font-medium text-sm truncate ${hidden ? 'text-muted-foreground italic' : ''}`}
        >
          {hidden ? (sensitive && isPublic ? '🔒 Private event' : 'Busy') : title}
        </motion.p>
        {!hidden && (
          <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground font-mono">
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{attendees}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{room}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyToggle;