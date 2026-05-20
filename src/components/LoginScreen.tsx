import { useState } from "react";
import { Eye, EyeOff, Handshake, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[radial-gradient(circle_at_top,_hsl(var(--accent))/0.18,_transparent_34%),linear-gradient(180deg,hsl(var(--primary))/0.08_0%,transparent_52%)] px-6 py-10">
      <div className="mb-8 animate-fade-in rounded-[32px] border border-border/70 bg-card/95 p-6 shadow-[0_28px_60px_-36px_hsl(var(--primary)/0.6)] backdrop-blur">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
          <Handshake className="h-8 w-8" />
        </div>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/70">Servicio comunitario</p>
        <h1 className="mt-2 text-3xl font-black leading-tight text-foreground">FoundFast</h1>
        <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
          Una red local para reportar objetos encontrados y facilitar devoluciones con confianza.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
          <ShieldCheck className="h-3.5 w-3.5" />
          Verificación y trazabilidad básica
        </div>
      </div>

      <div className="w-full space-y-4 rounded-[32px] border border-border/70 bg-card p-6 shadow-sm">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-2xl border-border bg-background pl-11"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-2xl border-border bg-background pl-11 pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="text-right">
          <button className="text-sm text-primary font-semibold hover:underline">
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <Button
          onClick={onLogin}
          className="h-12 w-full rounded-2xl text-base font-bold shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 active:scale-[0.98]"
        >
          Iniciar Sesión
        </Button>

        <Button
          variant="outline"
          onClick={onLogin}
          className="h-12 w-full gap-3 rounded-2xl border-2 text-base font-semibold transition-all active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Entrar con Google
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿No tienes cuenta?{" "}
        <button className="text-primary font-bold hover:underline">Regístrate</button>
      </p>
    </div>
  );
};

export default LoginScreen;
