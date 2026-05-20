import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, BadgeCheck, Calendar, Gift, MapPin, Package, Star, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { UserProfile, Reward } from "@/data/mockData";
import { badgeIcons } from "@/lib/icon-registry";
import InitialAvatar from "@/components/InitialAvatar";
import RewardBrandLogo from "@/components/RewardBrandLogo";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ease = [0.16, 1, 0.3, 1] as const;

type ProfileData = UserProfile & { rewards: Reward[] };

const ProfileScreen = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<string | null>(null);

  useEffect(() => {
    api.getProfile()
      .then(setProfile)
      .catch(() => toast.error("No se pudo cargar el perfil"))
      .finally(() => setLoading(false));
  }, []);

  const handleRedeem = async (reward: Reward) => {
    if (!profile || redeeming) return;
    setRedeeming(reward.id);
    try {
      const result = await api.redeemReward(reward.id);
      setProfile((prev) => prev ? { ...prev, points: result.points } : prev);
      toast.success(`¡${reward.title} canjeado!`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo canjear");
    } finally {
      setRedeeming(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-background p-4 gap-4 pb-24">
        <div className="h-32 animate-pulse rounded-[28px] bg-muted/50" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((n) => <div key={n} className="h-24 animate-pulse rounded-[20px] bg-muted/50" />)}
        </div>
        <div className="h-48 animate-pulse rounded-[20px] bg-muted/50" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-full items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Error al cargar el perfil</p>
      </div>
    );
  }

  const stats = [
    { value: profile.stats.returns, label: "Devoluciones", Icon: BadgeCheck, color: "text-primary bg-primary/10" },
    { value: profile.stats.recoveries, label: "Recuperaciones", Icon: Package, color: "text-accent-foreground bg-accent/15" },
    { value: profile.stats.rating, label: "Calificación", Icon: Star, color: "text-primary bg-primary/10" },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="border-b border-border/60 bg-[linear-gradient(160deg,hsl(var(--primary)/0.07)_0%,transparent_60%)] px-4 pt-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="rounded-[28px] border border-border/60 bg-card p-5 shadow-[0_12px_36px_-16px_hsl(var(--primary)/0.35)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
              >
                <InitialAvatar
                  initials={profile.initials}
                  className="h-16 w-16 rounded-[18px] bg-primary text-primary-foreground"
                  textClassName="text-lg tracking-[0.18em]"
                />
              </motion.div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">Perfil</p>
                <h2 className="mt-0.5 text-2xl font-extrabold tracking-tight text-foreground">{profile.name}</h2>
                <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>{profile.location}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>Desde {profile.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[18px] border border-accent/25 bg-accent/10 px-4 py-3 text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-foreground/70">Puntos</p>
              <div className="mt-1 flex items-center justify-end gap-1.5 text-accent-foreground">
                <Award className="h-4 w-4" />
                <span className="text-xl font-extrabold">{profile.points.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-6 px-4 py-5">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          className="grid grid-cols-3 gap-3"
        >
          {stats.map(({ value, label, Icon, color }) => (
            <Card key={label} className="rounded-[20px] border-border/60 bg-card p-4 text-center shadow-sm">
              <div className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-3 text-xl font-extrabold tracking-tight text-foreground">{value}</p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
            </Card>
          ))}
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18, ease }}
          className="space-y-3"
        >
          <h3 className="flex items-center gap-2 text-sm font-extrabold text-foreground">
            <Trophy className="h-4 w-4 text-primary" />
            Insignias
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {profile.badges.map((badge) => (
              <Card
                key={badge.label}
                className={`rounded-[20px] border p-4 transition-all ${
                  badge.unlocked
                    ? "border-primary/20 bg-card shadow-sm"
                    : "border-border/40 bg-muted/25"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-[14px] ${
                      badge.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {(() => {
                      const Icon = badgeIcons[badge.iconKey];
                      return <Icon className="h-4 w-4" />;
                    })()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight text-foreground">{badge.label}</p>
                    <Badge
                      className={`mt-2 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                        badge.unlocked
                          ? "border-success/20 bg-success/10 text-success"
                          : "border-border/50 bg-background text-muted-foreground"
                      }`}
                    >
                      {badge.unlocked ? "Disponible" : "En progreso"}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26, ease }}
          className="space-y-3"
        >
          <h3 className="flex items-center gap-2 text-sm font-extrabold text-foreground">
            <Gift className="h-4 w-4 text-primary" />
            Recompensas Canjeables
          </h3>
          <div className="space-y-2.5">
            {profile.rewards.map((reward) => {
              const canAfford = profile.points >= reward.pointsCost;
              const isRedeeming = redeeming === reward.id;
              return (
                <Card key={reward.id} className="rounded-[20px] border-border/60 bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <RewardBrandLogo iconKey={reward.iconKey} className="flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-foreground">{reward.title}</p>
                      <p className="text-xs text-muted-foreground">{reward.description}</p>
                    </div>
                    <motion.div whileTap={{ scale: 0.94 }}>
                      <Button
                        size="sm"
                        variant={canAfford ? "default" : "secondary"}
                        className="h-9 rounded-xl px-3 text-xs font-bold shadow-md shadow-primary/20 transition-all hover:shadow-lg active:scale-95 disabled:opacity-60"
                        disabled={!canAfford || !!redeeming}
                        onClick={() => handleRedeem(reward)}
                      >
                        {isRedeeming ? "…" : `${reward.pointsCost} pts`}
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileScreen;
