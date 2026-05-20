import { Home, Search, PlusCircle, Trophy, User } from "lucide-react";

export type Screen = 'login' | 'home' | 'search' | 'publish' | 'ranking' | 'profile' | 'claim';

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems: { icon: typeof Home; label: string; screen: Screen }[] = [
  { icon: Home, label: 'Inicio', screen: 'home' },
  { icon: Search, label: 'Buscar', screen: 'search' },
  { icon: PlusCircle, label: 'Publicar', screen: 'publish' },
  { icon: Trophy, label: 'Ranking', screen: 'ranking' },
  { icon: User, label: 'Perfil', screen: 'profile' },
];

const BottomNav = ({ active, onNavigate }: BottomNavProps) => {
  return (
    <div className="flex items-center justify-around border-t border-border/70 bg-card/95 px-2 py-2 backdrop-blur">
      {navItems.map(({ icon: Icon, label, screen }) => {
        const isActive = active === screen || (screen === 'home' && (active === 'claim' || active === 'search'));
        return (
          <button
            type="button"
            key={screen}
            onClick={() => onNavigate(screen)}
            className={`flex min-w-[64px] flex-col items-center gap-1 rounded-2xl px-3 py-2 transition-all ${
              isActive
                ? "bg-primary/8 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className={`w-5 h-5 ${screen === 'publish' ? 'w-6 h-6' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em]">{label}</span>
            {isActive && <div className="h-1 w-6 rounded-full bg-primary" />}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
