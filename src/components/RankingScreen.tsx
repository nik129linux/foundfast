import { motion } from "framer-motion";
import { Star, Trophy } from "lucide-react";
import { mockRanking } from "@/data/mockData";
import InitialAvatar from "@/components/InitialAvatar";

const ease = [0.16, 1, 0.3, 1] as const;

const PODIUM_HEIGHT = { 1: "h-20", 2: "h-14", 3: "h-10" } as const;

const RankingScreen = () => {
  const podiumOrder = [
    mockRanking.find((e) => e.rank === 2)!,
    mockRanking.find((e) => e.rank === 1)!,
    mockRanking.find((e) => e.rank === 3)!,
  ];
  const rest = mockRanking.filter((e) => e.rank > 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease }}
      className="flex h-full flex-col overflow-y-auto bg-background pb-24"
    >
      {/* Header */}
      <div className="border-b border-border/60 bg-[linear-gradient(160deg,hsl(var(--primary)/0.08)_0%,transparent_60%)] px-4 pt-6 pb-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">Tabla de posiciones</p>
        <h1 className="mt-0.5 flex items-center gap-2 text-2xl font-extrabold tracking-tight text-foreground">
          <Trophy className="h-6 w-6 text-primary" />
          Ranking
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">Halladores destacados de Pasto</p>
      </div>

      {/* Podium */}
      <div className="border-b border-border/60 bg-card px-4 py-6">
        <div className="flex items-end justify-center gap-4">
          {podiumOrder.map((entry, idx) => {
            const isFirst = idx === 1;
            const medals = ['🥈', '🥇', '🥉'];
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.05 + idx * 0.07 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xl">{medals[idx]}</span>
                <InitialAvatar
                  initials={entry.initials}
                  className={`${isFirst ? "h-20 w-20" : "h-14 w-14"} rounded-full ${
                    isFirst
                      ? "ring-4 ring-primary/40 bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.5)]"
                      : entry.isCurrentUser
                      ? "ring-2 ring-accent/40 bg-accent text-accent-foreground"
                      : "bg-primary/80 text-primary-foreground"
                  }`}
                  textClassName={`${isFirst ? "text-base" : "text-xs"} tracking-[0.18em]`}
                />
                <div className="text-center">
                  <p className={`${isFirst ? "text-sm" : "text-xs"} font-extrabold text-foreground`}>
                    {entry.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground">{entry.points.toLocaleString()} pts</p>
                </div>
                <div
                  className={`flex w-16 items-center justify-center rounded-t-2xl bg-[linear-gradient(180deg,hsl(var(--primary))_0%,hsl(var(--primary)/0.6)_100%)] text-primary-foreground ${
                    PODIUM_HEIGHT[entry.rank as 1 | 2 | 3]
                  } ${isFirst ? "shadow-lg shadow-primary/30" : ""}`}
                >
                  <span className="text-sm font-extrabold">#{entry.rank}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* List positions 4+ */}
      <div className="px-4 py-4 space-y-2">
        {rest.map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.04, ease }}
          >
            <div
              className={`flex items-center gap-3 rounded-2xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                entry.isCurrentUser
                  ? "border-accent/30 bg-accent/8 shadow-sm"
                  : "border-border/60 bg-card shadow-sm"
              }`}
            >
              <span className="w-7 text-sm font-extrabold text-muted-foreground">#{entry.rank}</span>
              <InitialAvatar
                initials={entry.initials}
                className={`h-9 w-9 flex-shrink-0 rounded-xl ${
                  entry.isCurrentUser ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"
                }`}
                textClassName="text-[10px] tracking-[0.14em]"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground">
                  {entry.name}
                  {entry.isCurrentUser && (
                    <span className="ml-2 rounded-full bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold text-accent-foreground">
                      TÚ
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <span className="text-xs text-muted-foreground">{entry.rating}</span>
                  <span className="text-xs text-muted-foreground">· {entry.returns} dev.</span>
                </div>
              </div>
              <span className="text-sm font-extrabold text-foreground">{entry.points.toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RankingScreen;
