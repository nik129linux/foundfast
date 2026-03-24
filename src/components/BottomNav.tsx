import { Home, Search, PlusCircle, Trophy, User } from "lucide-react";

export type Screen = 'login' | 'home' | 'search' | 'publish' | 'ranking' | 'profile' | 'claim';

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems: { icon: typeof Home; label: string; screen: Screen }[] = [
  { icon: Home, label: 'Home', screen: 'home' },
  { icon: Search, label: 'Buscar', screen: 'search' },
  { icon: PlusCircle, label: 'Publicar', screen: 'publish' },
  { icon: Trophy, label: 'Ranking', screen: 'ranking' },
  { icon: User, label: 'Perfil', screen: 'profile' },
];

const BottomNav = ({ active, onNavigate }: BottomNavProps) => {
  return (
    <div className="flex items-center justify-around px-2 py-2 bg-card border-t border-border">
      {navItems.map(({ icon: Icon, label, screen }) => {
        const isActive = active === screen || (screen === 'home' && (active === 'claim' || active === 'search'));
        return (
          <button
            key={screen}
            onClick={() => onNavigate(screen)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className={`w-5 h-5 ${screen === 'publish' ? 'w-6 h-6' : ''}`} />
            <span className="text-[10px] font-bold">{label}</span>
            {isActive && <div className="w-1 h-1 rounded-full bg-primary" />}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
