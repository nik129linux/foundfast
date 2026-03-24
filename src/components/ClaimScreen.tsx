import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Star, Shield, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockItems } from "@/data/mockData";

interface ClaimScreenProps {
  itemId: string;
  onBack: () => void;
}

const itemImages: Record<string, string> = {
  Llaves: '🔑',
  Electrónica: '📱',
  Documentos: '📄',
  Otros: '🎒',
};

const ClaimScreen = ({ itemId, onBack }: ClaimScreenProps) => {
  const item = mockItems.find((i) => i.id === itemId) || mockItems[0];
  const [answers, setAnswers] = useState(["", ""]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-card border-b border-border">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-secondary transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-black text-foreground">Detalle del Objeto</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Image carousel placeholder */}
        <div className="w-full h-56 bg-secondary flex items-center justify-center text-7xl">
          {itemImages[item.category] || '📦'}
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Title and badges */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-xl font-black text-foreground">{item.title}</h2>
              <Badge className={`flex-shrink-0 ${
                item.status === 'unclaimed'
                  ? 'bg-accent/15 text-accent border-accent/30'
                  : 'bg-primary/10 text-primary border-primary/30'
              }`}>
                {item.status === 'unclaimed' ? 'Sin reclamar' : `${item.claims} reclamos`}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              {item.location}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              {item.date}
            </div>
          </div>

          {/* Finder info */}
          <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
            <span className="text-3xl">{item.finder.avatar}</span>
            <div>
              <p className="font-bold text-sm text-foreground">Encontrado por {item.finder.name}</p>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-reward text-reward" />
                <span className="text-sm font-bold text-foreground">{item.finder.rating}</span>
                <span className="text-xs text-muted-foreground">• Hallador verificado</span>
              </div>
            </div>
          </div>

          {/* Security section */}
          {!submitted ? (
            <>
              <div className="p-4 bg-primary/5 rounded-xl border-2 border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="font-black text-sm text-primary">Verificación de Seguridad</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Para reclamar este objeto, debes responder las preguntas de verificación del hallador. 
                  Solo el verdadero dueño conoce estas respuestas.
                </p>
              </div>

              {/* Security questions */}
              <div className="space-y-3">
                {item.securityQuestions.map((q, i) => (
                  <div key={i}>
                    <label className="text-sm font-bold text-foreground mb-1.5 block">
                      {i + 1}. {q.question}
                    </label>
                    <Input
                      placeholder="Tu respuesta..."
                      value={answers[i]}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[i] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                      className="h-11 rounded-xl bg-card"
                    />
                  </div>
                ))}
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/25 active:scale-[0.98] transition-all gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar Reclamo
              </Button>
            </>
          ) : (
            <div className="p-6 bg-success/10 rounded-xl border-2 border-success/30 text-center">
              <span className="text-5xl block mb-3">✅</span>
              <h3 className="font-black text-lg text-success">¡Reclamo Enviado!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                El hallador revisará tus respuestas y te contactará pronto.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimScreen;
