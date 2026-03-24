import { useState } from "react";
import { Bell, Search, MapPin, Star, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockItems, CATEGORIES } from "@/data/mockData";
import type { FoundItem } from "@/data/mockData";

interface HomeScreenProps {
  onNavigate: (screen: string, itemId?: string) => void;
  hasNotification?: boolean;
}

const categoryIcons: Record<string, string> = {
  Todos: '📋',
  Documentos: '📄',
  Electrónica: '📱',
  Llaves: '🔑',
  Ropa: '👕',
  Mascotas: '🐾',
  Otros: '📦',
};

const itemImages: Record<string, string> = {
  Llaves: '🔑',
  Electrónica: '📱',
  Documentos: '📄',
  Otros: '🎒',
  Ropa: '👕',
  Mascotas: '🐾',
};

const HomeScreen = ({ onNavigate, hasNotification = true }: HomeScreenProps) => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = mockItems.filter((item) => {
    const matchesCategory = activeFilter === "Todos" || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-black text-foreground">NO ME LO RETAI</h1>
            <p className="text-xs text-muted-foreground font-semibold">Objetos encontrados cerca de ti</p>
          </div>
          <button className="relative p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            {hasNotification && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-card" />
            )}
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar objeto perdido..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-secondary border-0"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <span>{categoryIcons[cat]}</span>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-24">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} onTap={() => onNavigate("claim", item.id)} />
        ))}
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <span className="text-5xl mb-3">🔍</span>
            <p className="font-semibold">No se encontraron objetos</p>
            <p className="text-sm">Intenta con otra búsqueda o categoría</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <div className="absolute bottom-20 right-4">
        <Button
          onClick={() => onNavigate("publish")}
          className="h-14 px-5 rounded-2xl shadow-xl shadow-primary/30 font-bold text-sm gap-2 active:scale-95 transition-transform"
        >
          <Plus className="w-5 h-5" />
          ENCONTRÉ ALGO
        </Button>
      </div>
    </div>
  );
};

const ItemCard = ({ item, onTap }: { item: FoundItem; onTap: () => void }) => (
  <Card
    className="p-3 flex gap-3 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] border-border/60"
    onClick={onTap}
  >
    <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center text-3xl flex-shrink-0">
      {itemImages[item.category] || '📦'}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-sm text-foreground line-clamp-1">{item.title}</h3>
      <div className="flex items-center gap-1 mt-1 text-muted-foreground">
        <MapPin className="w-3 h-3" />
        <span className="text-xs truncate">{item.location}</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1.5">
          <span className="text-lg">{item.finder.avatar}</span>
          <span className="text-xs font-semibold text-foreground">{item.finder.name}</span>
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-reward text-reward" />
            <span className="text-xs font-bold text-reward-foreground">{item.finder.rating}</span>
          </div>
        </div>
        <Badge
          variant={item.status === 'unclaimed' ? 'secondary' : 'default'}
          className={`text-[10px] ${
            item.status === 'unclaimed'
              ? 'bg-accent/15 text-accent border-accent/30'
              : 'bg-primary/10 text-primary border-primary/30'
          }`}
        >
          {item.status === 'unclaimed' ? 'Sin reclamar' : `${item.claims} reclamos`}
        </Badge>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{item.timeAgo}</p>
    </div>
  </Card>
);

export default HomeScreen;
