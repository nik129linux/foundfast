import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Send, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { FoundItem } from "@/data/mockData";
import { itemIcons } from "@/lib/icon-registry";
import InitialAvatar from "@/components/InitialAvatar";
import { api } from "@/lib/api";

interface ClaimScreenProps {
  itemId: string;
  onBack: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const ClaimScreen = ({ itemId, onBack }: ClaimScreenProps) => {
  const [item, setItem] = useState<FoundItem | null>(null);
  const [loadingItem, setLoadingItem] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [claimError, setClaimError] = useState("");

  useEffect(() => {
    setLoadingItem(true);
    api.getItem(itemId)
      .then((data) => {
        setItem(data);
        setAnswers(data.securityQuestions.map(() => ""));
      })
      .catch(() => setItem(null))
      .finally(() => setLoadingItem(false));
  }, [itemId]);

  const handleSubmit = async () => {
    if (!item) return;
    const nonEmpty = answers.filter((a) => a.trim());
    if (nonEmpty.length === 0) {
      setClaimError("Responde al menos una pregunta");
      return;
    }
    setSubmitting(true);
    setClaimError("");
    let matched = false;
    for (const answer of nonEmpty) {
      try {
        const result = await api.claimItem(item.id, answer);
        if (result.success) { matched = true; break; }
      } catch {
        // network error
      }
    }
    if (matched) {
      setSubmitted(true);
    } else {
      setClaimError("Las respuestas no coinciden. Verifica e intenta de nuevo.");
    }
    setSubmitting(false);
  };

  if (loadingItem) {
    return (
      <div className="flex h-full flex-col bg-background">
        <div className="flex items-center gap-3 border-b border-border/60 bg-card/80 px-4 pt-4 pb-3">
          <button type="button" onClick={onBack} className="rounded-xl p-2 text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-extrabold tracking-tight text-foreground">Detalle del objeto</h1>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="h-44 animate-pulse rounded-[20px] bg-muted/50" />
          <div className="h-8 animate-pulse rounded-xl bg-muted/50" />
          <div className="h-24 animate-pulse rounded-xl bg-muted/50" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-background p-8 text-center">
        <p className="text-base font-bold text-foreground">No se encontró el objeto</p>
        <button type="button" onClick={onBack} className="text-sm font-semibold text-primary hover:underline">
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/60 bg-card/80 px-4 pt-4 pb-3 backdrop-blur-sm">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl p-2 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-90"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-base font-extrabold tracking-tight text-foreground">Detalle del objeto</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Icon hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease }}
          className="flex h-44 w-full items-center justify-center bg-[linear-gradient(180deg,hsl(var(--primary)/0.12)_0%,hsl(var(--accent)/0.06)_100%)]"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
            className="flex h-24 w-24 items-center justify-center rounded-3xl bg-card text-primary shadow-[0_8px_28px_-8px_hsl(var(--primary)/0.35)]"
          >
            {(() => {
              const Icon = itemIcons[item.category] || itemIcons.Otros;
              return <Icon className="h-12 w-12" />;
            })()}
          </motion.div>
        </motion.div>

        <div className="space-y-4 px-4 py-5">
          {/* Title + badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-extrabold tracking-tight text-foreground">{item.title}</h2>
              <Badge
                className={`flex-shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                  item.status === "unclaimed"
                    ? "border-accent/25 bg-accent/15 text-accent-foreground"
                    : "border-primary/20 bg-primary/10 text-primary"
                }`}
              >
                {item.status === "unclaimed" ? "Sin reclamar" : `${item.claims} reclamos`}
              </Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
          </motion.div>

          {/* Meta pills */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease }}
            className="flex flex-wrap gap-2"
          >
            <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {item.location}
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              {item.date}
            </div>
          </motion.div>

          {/* Finder card */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease }}
            className="flex items-center gap-3 rounded-[20px] border border-border/60 bg-card p-4 shadow-sm"
          >
            <InitialAvatar initials={item.finder.initials} className="h-12 w-12 rounded-[14px]" textClassName="text-sm tracking-[0.18em]" />
            <div>
              <p className="text-sm font-bold text-foreground">Encontrado por {item.finder.name}</p>
              <div className="mt-0.5 flex items-center gap-1 text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                <span className="text-sm font-bold text-foreground">{item.finder.rating}</span>
                <span className="text-xs">Hallador verificado</span>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.4, ease }}
                className="space-y-4"
              >
                {/* Security info */}
                <div className="rounded-[20px] border border-primary/15 bg-primary/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-extrabold text-primary">Verificación de seguridad</h3>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">
                    Responde las preguntas del hallador. Solo el dueño real debería conocer estas respuestas.
                  </p>
                </div>

                {/* Questions */}
                <div className="space-y-3">
                  {item.securityQuestions.map((q, i) => (
                    <div key={q.question}>
                      <label className="mb-1.5 block text-sm font-bold text-foreground">
                        {i + 1}. {q.question}
                      </label>
                      <Input
                        placeholder="Escribe tu respuesta"
                        value={answers[i] ?? ""}
                        onChange={(e) => {
                          const next = [...answers];
                          next[i] = e.target.value;
                          setAnswers(next);
                        }}
                        className="h-11 rounded-2xl border-border/60 bg-card text-sm transition-shadow focus:shadow-[0_0_0_3px_hsl(var(--ring)/0.12)]"
                      />
                    </div>
                  ))}
                </div>

                {claimError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive"
                  >
                    {claimError}
                  </motion.p>
                )}

                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="h-12 w-full gap-2 rounded-2xl text-sm font-bold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35 disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? "Verificando…" : "Enviar Reclamo"}
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="rounded-[24px] border border-success/25 bg-success/8 px-6 py-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 16, delay: 0.15 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15"
                >
                  <motion.div
                    animate={{ rotate: [0, -8, 8, -4, 0] }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  >
                    <ShieldCheck className="h-8 w-8 text-success" />
                  </motion.div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35, ease }}
                  className="mt-4 text-xl font-extrabold text-success"
                >
                  Reclamo enviado
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  className="mt-2 text-sm leading-6 text-muted-foreground"
                >
                  El hallador revisará tus respuestas y se pondrá en contacto contigo.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ClaimScreen;
