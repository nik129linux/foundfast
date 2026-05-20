import { Award, BadgeCheck, Calendar, Gift, MapPin, Package, Star, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockUser, mockRewards } from "@/data/mockData";
import { badgeIcons } from "@/lib/icon-registry";
import InitialAvatar from "@/components/InitialAvatar";
import RewardBrandLogo from "@/components/RewardBrandLogo";

const stats = [
  { value: mockUser.stats.returns, label: "Devoluciones", Icon: BadgeCheck },
  { value: mockUser.stats.recoveries, label: "Recuperaciones", Icon: Package },
  { value: mockUser.stats.rating, label: "Calificación", Icon: Star },
];

const ProfileScreen = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-background pb-24">
      <div className="border-b border-border/70 bg-[radial-gradient(circle_at_top,_hsl(var(--accent))/0.18,_transparent_42%),linear-gradient(180deg,hsl(var(--primary))/0.06_0%,transparent_100%)] px-4 pt-6 pb-8">
        <div className="rounded-[28px] border border-border/80 bg-card/95 p-5 shadow-[0_22px_50px_-32px_hsl(var(--primary)/0.6)] backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <InitialAvatar
                initials={mockUser.initials}
                className="h-16 w-16 rounded-2xl bg-primary text-primary-foreground"
                textClassName="text-lg tracking-[0.18em]"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">Perfil</p>
                <h2 className="mt-1 text-2xl font-black text-foreground">{mockUser.name}</h2>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{mockUser.location}</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Miembro desde {mockUser.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-accent/20 bg-accent/12 px-4 py-3 text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent-foreground/80">
                Puntos
              </p>
              <div className="mt-1 flex items-center justify-end gap-2 text-accent-foreground">
                <Award className="h-4 w-4" />
                <span className="text-xl font-black">{mockUser.points.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-4 py-5">
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ value, label, Icon }) => (
            <Card key={label} className="rounded-2xl border-border/70 bg-card/95 p-4 text-center shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-xl font-black text-foreground">{value}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-base font-black text-foreground">
            <Trophy className="h-5 w-5 text-primary" />
            Insignias
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {mockUser.badges.map((badge) => (
              <Card
                key={badge.label}
                className={`rounded-2xl border p-4 transition-all ${
                  badge.unlocked ? "border-primary/20 bg-card shadow-sm" : "border-border/50 bg-muted/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      badge.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {(() => {
                      const Icon = badgeIcons[badge.iconKey];
                      return <Icon className="h-5 w-5" />;
                    })()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight text-foreground">{badge.label}</p>
                    <Badge
                      className={`mt-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        badge.unlocked
                          ? "border-success/20 bg-success/10 text-success"
                          : "border-border/60 bg-background text-muted-foreground"
                      }`}
                    >
                      {badge.unlocked ? "Disponible" : "En progreso"}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-base font-black text-foreground">
            <Gift className="h-5 w-5 text-primary" />
            Recompensas Canjeables
          </h3>
          <div className="space-y-3">
            {mockRewards.map((reward) => (
              <Card key={reward.id} className="rounded-2xl border-border/70 bg-card/95 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <RewardBrandLogo iconKey={reward.iconKey} className="flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm text-foreground">{reward.title}</p>
                    <p className="text-xs text-muted-foreground">{reward.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={mockUser.points >= reward.pointsCost ? "default" : "secondary"}
                    className="h-10 rounded-xl px-3 text-xs font-bold"
                    disabled={mockUser.points < reward.pointsCost}
                  >
                    {reward.pointsCost} pts
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
