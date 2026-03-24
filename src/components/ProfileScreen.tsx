import { MapPin, Calendar, Star, Trophy, Gift, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockUser, mockRewards } from "@/data/mockData";

const ProfileScreen = () => {
  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto pb-24">
      {/* Profile header */}
      <div className="bg-gradient-to-b from-primary to-primary/80 px-4 pt-6 pb-8 text-center">
        <div className="w-20 h-20 rounded-full bg-card mx-auto flex items-center justify-center text-4xl shadow-xl border-4 border-card">
          {mockUser.avatar}
        </div>
        <h2 className="text-xl font-black text-primary-foreground mt-3">{mockUser.name}</h2>
        <div className="flex items-center justify-center gap-1.5 text-primary-foreground/80 text-sm mt-1">
          <MapPin className="w-3.5 h-3.5" />
          {mockUser.location}
        </div>
        <div className="flex items-center justify-center gap-1.5 text-primary-foreground/60 text-xs mt-1">
          <Calendar className="w-3 h-3" />
          Miembro desde {mockUser.joinDate}
        </div>

        {/* Points banner */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full shadow-lg">
          <span className="text-lg">⭐</span>
          <span className="text-lg font-black text-accent-foreground">{mockUser.points.toLocaleString()}</span>
          <span className="text-sm font-semibold text-accent-foreground/80">puntos</span>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: mockUser.stats.returns, label: 'Devoluciones', icon: '🤝' },
            { value: mockUser.stats.recoveries, label: 'Recuperaciones', icon: '📦' },
            { value: mockUser.stats.rating, label: 'Rating', icon: '⭐' },
          ].map((stat) => (
            <Card key={stat.label} className="p-3 text-center bg-card border-border/60">
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-xl font-black text-foreground mt-1">{stat.value}</p>
              <p className="text-[10px] font-semibold text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Badges */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-accent" />
            <h3 className="font-black text-foreground">Insignias</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {mockUser.badges.map((badge) => (
              <Card
                key={badge.label}
                className={`p-3 text-center transition-all ${
                  badge.unlocked ? 'bg-card border-border/60' : 'bg-muted/50 border-border/30 opacity-50'
                }`}
              >
                <span className="text-2xl block">{badge.icon}</span>
                <p className="text-[10px] font-bold text-foreground mt-1.5 leading-tight">{badge.label}</p>
                {badge.unlocked && (
                  <Badge className="mt-1 text-[8px] bg-success/15 text-success border-success/30 px-1.5">
                    ✓ Logrado
                  </Badge>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-accent" />
            <h3 className="font-black text-foreground">Recompensas Canjeables</h3>
          </div>
          <div className="space-y-2">
            {mockRewards.map((reward) => (
              <Card key={reward.id} className="p-3 flex items-center gap-3 border-border/60">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
                  {reward.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground">{reward.title}</p>
                  <p className="text-xs text-muted-foreground">{reward.description}</p>
                </div>
                <Button
                  size="sm"
                  variant={mockUser.points >= reward.pointsCost ? "default" : "secondary"}
                  className="rounded-lg text-xs font-bold flex-shrink-0 active:scale-95 transition-transform"
                  disabled={mockUser.points < reward.pointsCost}
                >
                  {reward.pointsCost} pts
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
