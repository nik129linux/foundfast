import { useState } from "react";
import { Bell, MapPin, Plus, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockItems, CATEGORIES } from "@/data/mockData";
import type { FoundItem } from "@/data/mockData";
import { categoryIcons, itemIcons } from "@/lib/icon-registry";
import InitialAvatar from "@/components/InitialAvatar";

interface HomeScreenProps {
  onNavigate: (screen: string, itemId?: string) => void;
  hasNotification?: boolean;
}

const HomeScreen = ({ onNavigate, hasNotification = true }: HomeScreenProps) => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = mockItems.filter((item) => {
    const matchesCategory = activeFilter === "Todos" || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b border-border/70 bg-[linear-gradient(180deg,hsl(var(--primary))/0.06_0%,transparent_100%)] px-4 pt-5 pb-3">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/75">Red local</p>
            <h1 className="mt-1 text-2xl font-black text-foreground">FoundFast</h1>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Hallazgos reportados en Pasto</span>
            </div>
          </div>
          <button
            type="button"
            className="relative rounded-2xl border border-border/70 bg-card p-3 shadow-sm transition-colors hover:bg-secondary/80"
          >
            <Bell className="h-5 w-5 text-foreground" />
            {hasNotification && (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-card" />
            )}
          </button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Busca por objeto o referencia"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 rounded-2xl border-border/70 bg-card pl-10 shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "border-border/70 bg-card text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {(() => {
                const Icon = categoryIcons[cat];
                return <Icon className="h-3.5 w-3.5" />;
              })()}
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 pb-24">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} onTap={() => onNavigate("claim", item.id)} />
        ))}
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-border bg-card px-6 py-16 text-center text-muted-foreground">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Search className="h-6 w-6" />
            </div>
            <p className="mt-4 font-semibold text-foreground">No se encontraron objetos</p>
            <p className="text-sm">Intenta con otra búsqueda o categoría</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-20 right-4">
        <Button
          onClick={() => onNavigate("publish")}
          className="h-14 gap-2 rounded-2xl px-5 text-sm font-bold shadow-xl shadow-primary/30 transition-transform active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Reportar hallazgo
        </Button>
      </div>
    </div>
  );
};

const ItemCard = ({ item, onTap }: { item: FoundItem; onTap: () => void }) => (
  <Card
    className="cursor-pointer rounded-[24px] border-border/70 bg-card/95 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
    onClick={onTap}
  >
    <div className="flex gap-4">
      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[22px] bg-primary/8 text-primary">
        {(() => {
          const Icon = itemIcons[item.category] || itemIcons.Otros;
          return <Icon className="h-8 w-8" />;
        })()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="line-clamp-2 text-sm font-bold text-foreground">{item.title}</h3>
            <div className="mt-2 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-xs">{item.location}</span>
            </div>
          </div>
          <Badge
            variant={item.status === "unclaimed" ? "secondary" : "default"}
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              item.status === "unclaimed"
                ? "border-accent/20 bg-accent/10 text-accent-foreground"
                : "border-primary/20 bg-primary/10 text-primary"
            }`}
          >
            {item.status === "unclaimed" ? "Sin reclamar" : `${item.claims} reclamos`}
          </Badge>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <InitialAvatar initials={item.finder.initials} className="h-9 w-9 rounded-2xl" textClassName="text-xs tracking-[0.18em]" />
            <div>
              <p className="text-xs font-semibold text-foreground">{item.finder.name}</p>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                <span className="text-xs font-semibold text-foreground">{item.finder.rating}</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] font-medium text-muted-foreground">{item.timeAgo}</p>
        </div>
      </div>
    </div>
  </Card>
);

export default HomeScreen;
