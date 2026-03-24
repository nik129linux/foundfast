import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/data/mockData";

interface PublishScreenProps {
  onBack: () => void;
  onPublish: () => void;
}

const PublishScreen = ({ onBack, onPublish }: PublishScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState<number[]>([]);

  const categories = CATEGORIES.filter((c) => c !== "Todos");

  const handlePublish = () => {
    onPublish();
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-card border-b border-border">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-secondary transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-black text-foreground">Publicar Hallazgo</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-8">
        {/* Photo upload area */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">📸 Fotos del objeto</label>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                  photos.includes(i)
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 bg-secondary/50"
                }`}
                onClick={() =>
                  setPhotos((prev) =>
                    prev.includes(i) ? prev.filter((p) => p !== i) : [...prev, i]
                  )
                }
              >
                <Camera className={`w-5 h-5 ${photos.includes(i) ? "text-primary" : "text-muted-foreground"}`} />
                {photos.includes(i) && <span className="text-[10px] font-bold text-primary mt-0.5">✓</span>}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Máximo 4 fotos</p>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">📂 Categoría</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">✏️ Título</label>
          <Input
            placeholder="Ej: Llavero con 3 llaves"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 rounded-xl bg-card"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">📝 Descripción</label>
          <textarea
            placeholder="Describe el objeto con detalle para que su dueño lo reconozca..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-24 rounded-xl border border-input bg-card px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
          <div className="flex items-start gap-2 mt-2 p-2.5 bg-accent/10 rounded-lg border border-accent/20">
            <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-xs text-accent font-semibold">
              Por seguridad, NO incluyas datos sensibles ni fotos de documentos completos
            </p>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">📍 Ubicación</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="¿Dónde lo encontraste?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 h-11 rounded-xl bg-card"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">📅 Fecha del hallazgo</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="date"
              defaultValue="2026-03-24"
              className="pl-10 h-11 rounded-xl bg-card"
            />
          </div>
        </div>

        {/* Publish button */}
        <Button
          onClick={handlePublish}
          className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/25 active:scale-[0.98] transition-all"
        >
          🤝 Publicar Hallazgo
        </Button>
      </div>
    </div>
  );
};

export default PublishScreen;
