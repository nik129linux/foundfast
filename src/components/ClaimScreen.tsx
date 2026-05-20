import { useState } from "react";
import { ArrowLeft, Calendar, CircleCheck, MapPin, Send, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockItems } from "@/data/mockData";
import { itemIcons } from "@/lib/icon-registry";
import InitialAvatar from "@/components/InitialAvatar";

interface ClaimScreenProps {
  itemId: string;
  onBack: () => void;
}

const ClaimScreen = ({ itemId, onBack }: ClaimScreenProps) => {
  const item = mockItems.find((i) => i.id === itemId) || mockItems[0];
  const [answers, setAnswers] = useState(["", ""]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center gap-3 border-b border-border/70 bg-card/95 px-4 pt-4 pb-3 backdrop-blur">
        <button type="button" onClick={onBack} className="rounded-2xl p-2 transition-colors hover:bg-secondary">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-black text-foreground">Detalle del objeto</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        <div className="flex h-56 w-full items-center justify-center bg-[linear-gradient(180deg,hsl(var(--primary))/0.08_0%,hsl(var(--background))_100%)]">
          {(() => {
            const Icon = itemIcons[item.category] || itemIcons.Otros;
            return <Icon className="h-16 w-16 text-primary" />;
          })()}
        </div>

        <div className="space-y-4 px-4 py-5">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-xl font-black text-foreground">{item.title}</h2>
              <Badge
                className={`flex-shrink-0 rounded-full px-2.5 py-1 ${
                  item.status === "unclaimed"
                    ? "border-accent/20 bg-accent/10 text-accent-foreground"
                    : "border-primary/20 bg-primary/10 text-primary"
                }`}
              >
                {item.status === "unclaimed" ? "Sin reclamar" : `${item.claims} reclamos`}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {item.location}
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              {item.date}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-[24px] border border-border/70 bg-card p-4 shadow-sm">
            <InitialAvatar initials={item.finder.initials} className="h-12 w-12 rounded-2xl" textClassName="text-sm tracking-[0.18em]" />
            <div>
              <p className="text-sm font-bold text-foreground">Encontrado por {item.finder.name}</p>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                <span className="text-sm font-bold text-foreground">{item.finder.rating}</span>
                <span className="text-xs">Hallador verificado</span>
              </div>
            </div>
          </div>

          {!submitted ? (
            <>
              <div className="rounded-[24px] border border-primary/20 bg-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-black text-primary">Verificación de seguridad</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Para reclamar este objeto, responde las preguntas del hallador. Solo el dueño real debería conocer estas respuestas.
                </p>
              </div>

              <div className="space-y-3">
                {item.securityQuestions.map((q, i) => (
                  <div key={q.question}>
                    <label className="mb-1.5 block text-sm font-bold text-foreground">
                      {i + 1}. {q.question}
                    </label>
                    <Input
                      placeholder="Escribe tu respuesta"
                      value={answers[i]}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[i] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                      className="h-11 rounded-2xl bg-card"
                    />
                  </div>
                ))}
              </div>

              <Button
                onClick={handleSubmit}
                className="h-12 w-full gap-2 rounded-2xl text-base font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                Enviar Reclamo
              </Button>
            </>
          ) : (
            <div className="rounded-[24px] border border-success/30 bg-success/10 p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
                <CircleCheck className="h-7 w-7" />
              </div>
              <h3 className="mt-3 text-lg font-black text-success">Reclamo enviado</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                El hallador revisará tus respuestas y se pondrá en contacto contigo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimScreen;
