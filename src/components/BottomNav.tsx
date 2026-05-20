import { motion } from "framer-motion";
import { Home, PlusCircle, Trophy, User } from "lucide-react";

export type Screen = 'login' | 'home' | 'search' | 'publish' | 'ranking' | 'profile' | 'claim';

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems: { icon: typeof Home; label: string; screen: Screen; accent?: boolean }[] = [
  { icon: Home,       label: 'Inicio',   screen: 'home' },
  { icon: PlusCircle, label: 'Publicar', screen: 'publish', accent: true },
  { icon: Trophy,     label: 'Ranking',  screen: 'ranking' },
  { icon: User,       label: 'Perfil',   screen: 'profile' },
];

const ease = [0.16, 1, 0.3, 1] as const;

const BottomNav = ({ active, onNavigate }: BottomNavProps) => {
  return (
    <div className="flex items-end justify-around border-t border-border/60 bg-card/90 px-2 pb-safe pt-2 backdrop-blur-sm">
      {navItems.map(({ icon: Icon, label, screen, accent }) => {
        const isActive = active === screen || (screen === 'home' && active === 'claim');

        if (accent) {
          return (
            <motion.button
              key={screen}
              type="button"
              whileTap={{ scale: 0.88 }}
              transition={{ duration: 0.15 }}
              onClick={() => onNavigate(screen)}
              className="flex flex-col items-center gap-1 px-3 py-2"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-md transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-primary/35"
                    : "bg-primary/90 text-primary-foreground shadow-primary/20 hover:bg-primary"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.12em] ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label}
              </span>
            </motion.button>
          );
        }

        return (
          <motion.button
            key={screen}
            type="button"
            whileTap={{ scale: 0.88 }}
            transition={{ duration: 0.12 }}
            onClick={() => onNavigate(screen)}
            className="relative flex min-w-[52px] flex-col items-center gap-1 rounded-2xl px-3 py-2 transition-colors"
          >
            <Icon
              className={`h-5 w-5 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <span
              className={`text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -bottom-0.5 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-primary"
                transition={{ duration: 0.35, ease }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default BottomNav;
