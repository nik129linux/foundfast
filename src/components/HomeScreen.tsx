import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, MapPin, Plus, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/mockData";
import type { FoundItem } from "@/data/mockData";
import { categoryIcons, itemIcons } from "@/lib/icon-registry";
import InitialAvatar from "@/components/InitialAvatar";
import { api } from "@/lib/api";

interface HomeScreenProps {
  onNavigate: (screen: string, itemId?: string) => void;
  hasNotification?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

const HomeScreen = ({ onNavigate, hasNotification = true }: HomeScreenProps) => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [items, setItems] = useState<FoundItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    api.getItems(debouncedQuery, activeFilter)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [debouncedQuery, activeFilter]);

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border/60 bg-card/90 px-4 pt-5 pb-3 backdrop-blur-sm">
        <div className="mb-4 flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70">Red local</p>
            <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight text-foreground">FoundFast</h1>
            <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>Hallazgos en Pasto</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1, ease }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="relative rounded-2xl border border-border/60 bg-card p-3 shadow-sm transition-all hover:bg-secondary/70"
          >
            <Bell className="h-5 w-5 text-foreground" />
            {hasNotification && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.4 }}
                className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-card"
              />
            )}
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Busca por objeto o referencia"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 rounded-2xl border-border/60 bg-background pl-10 text-sm shadow-sm transition-shadow focus:shadow-[0_0_0_3px_hsl(var(--ring)/0.12)]"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-hide">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat}
              type="button"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.04, ease }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveFilter(cat)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {(() => {
                const Icon = categoryIcons[cat];
                return <Icon className="h-3.5 w-3.5" />;
              })()}
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Items list */}
      <div className="relative flex-1 overflow-y-auto px-4 py-4 pb-28">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-28 animate-pulse rounded-[22px] bg-muted/50" />
              ))}
            </motion.div>
          ) : items.length > 0 ? (
            <motion.div className="space-y-3">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.32, delay: index * 0.04, ease }}
                >
                  <ItemCard item={item} onTap={() => onNavigate("claim", item.id)} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-border bg-card/60 px-6 py-16 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Search className="h-6 w-6" />
              </div>
              <p className="mt-4 text-base font-bold text-foreground">No se encontraron objetos</p>
              <p className="mt-1 text-sm text-muted-foreground">Intenta con otra búsqueda o categoría</p>
              <button
                type="button"
                onClick={() => onNavigate("publish")}
                className="mt-5 text-sm font-semibold text-primary underline-offset-2 hover:underline"
              >
                Publica el primero
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAB */}
      <div className="absolute bottom-20 right-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.25 }}
          whileTap={{ scale: 0.94 }}
        >
          <Button
            onClick={() => onNavigate("publish")}
            className="h-14 gap-2 rounded-2xl px-5 text-sm font-bold shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40"
          >
            <Plus className="h-5 w-5" />
            Reportar hallazgo
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

const ItemCard = ({ item, onTap }: { item: FoundItem; onTap: () => void }) => (
  <Card
    className="cursor-pointer rounded-[22px] border-border/60 bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.25)] active:scale-[0.99]"
    onClick={onTap}
  >
    <div className="flex gap-4">
      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[18px] bg-primary/10 text-primary">
        {(() => {
          const Icon = itemIcons[item.category] || itemIcons.Otros;
          return <Icon className="h-8 w-8" />;
        })()}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground">{item.title}</h3>
            <div className="mt-1.5 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">{item.location}</span>
            </div>
          </div>
          <Badge
            className={`flex-shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
              item.status === "unclaimed"
                ? "border-red-500/40 bg-red-50 text-red-700"
                : "border-primary/20 bg-primary/10 text-primary"
            }`}
          >
            {item.status === "unclaimed" ? "Sin reclamar" : `${item.claims} reclamos`}
          </Badge>
        </div>

        <div className="mt-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <InitialAvatar initials={item.finder.initials} className="h-8 w-8 rounded-xl" textClassName="text-[10px] tracking-[0.16em]" />
            <div>
              <p className="text-xs font-semibold text-foreground">{item.finder.name}</p>
              <div className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-accent text-accent" />
                <span className="text-xs font-bold text-foreground">{item.finder.rating}</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">{item.timeAgo}</p>
        </div>
      </div>
    </div>
  </Card>
);

export default HomeScreen;
