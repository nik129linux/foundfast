import { useState } from "react";
import { AlertTriangle, ArrowLeft, Calendar, Camera, CircleCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/data/mockData";
import { categoryIcons } from "@/lib/icon-registry";
import { api } from "@/lib/api";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const categories = CATEGORIES.filter((c) => c !== "Todos");

  const handlePublish = async () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "El título es obligatorio";
    if (!selectedCategory) newErrors.category = "Selecciona una categoría";
    if (!location.trim()) newErrors.location = "La ubicación es obligatoria";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await api.createItem({
        title: title.trim(),
        category: selectedCategory,
        description: description.trim(),
        location: location.trim(),
      });
      onPublish();
    } catch (e) {
      setErrors({ general: e instanceof Error ? e.message : "Error al publicar" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center gap-3 border-b border-border/70 bg-card/95 px-4 pt-4 pb-3 backdrop-blur">
        <button type="button" onClick={onBack} className="rounded-2xl p-2 transition-colors hover:bg-secondary">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-black text-foreground">Publicar Hallazgo</h1>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 pb-8">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Camera className="h-4 w-4 text-primary" />
            Fotos del objeto
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <button
                type="button"
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
                <Camera className={`h-5 w-5 ${photos.includes(i) ? "text-primary" : "text-muted-foreground"}`} />
                {photos.includes(i) && <CircleCheck className="mt-1 h-3.5 w-3.5 text-primary" />}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Máximo 4 fotos</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">Categoría</label>
          {errors.category && <p role="alert" className="text-xs text-destructive">{errors.category}</p>}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border/70 bg-card text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {(() => {
                  const Icon = categoryIcons[cat];
                  return <Icon className="h-3.5 w-3.5" />;
                })()}
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">Título</label>
          {errors.title && <p role="alert" className="text-xs text-destructive">{errors.title}</p>}
          <Input
            placeholder="Ej: Llavero con 3 llaves"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 rounded-2xl bg-card"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">Descripción</label>
          <textarea
            placeholder="Describe el objeto con detalle para que su dueño lo reconozca..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-28 w-full resize-none rounded-2xl border border-input bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="mt-2 flex items-start gap-2 rounded-2xl border border-red-500/40 bg-red-50 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-700" />
            <p className="text-xs text-black font-semibold">
              Por seguridad, no incluyas datos sensibles ni fotos de documentos completos.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">Ubicación</label>
          {errors.location && <p role="alert" className="text-xs text-destructive">{errors.location}</p>}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="¿Dónde lo encontraste?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-11 rounded-2xl bg-card pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">Fecha del hallazgo</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              className="h-11 rounded-2xl bg-card pl-10"
            />
          </div>
        </div>

        {errors.general && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
            {errors.general}
          </p>
        )}

        <Button
          onClick={handlePublish}
          disabled={loading}
          className="h-12 w-full rounded-2xl text-base font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Publicando…" : "Publicar Hallazgo"}
        </Button>
      </div>
    </div>
  );
};

export default PublishScreen;
