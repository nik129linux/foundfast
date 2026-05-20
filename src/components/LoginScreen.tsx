import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Handshake, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginScreenProps {
  onLogin: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Gradient hero */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[linear-gradient(145deg,hsl(var(--primary))_0%,hsl(var(--accent))_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)" }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.05 }}
          className="flex flex-col items-center gap-3 text-white"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg">
            <Handshake className="h-8 w-8" />
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/70">
              Pasto, Colombia
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight">FoundFast</h1>
          </div>
        </motion.div>
      </div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease }}
        className="flex flex-1 flex-col justify-center px-6 py-6"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Verificación y trazabilidad básica
        </motion.div>

        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          Red local para reportar objetos encontrados y facilitar devoluciones con confianza.
        </p>

        <div className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-2xl border-border/60 bg-white pl-10 text-sm shadow-sm transition-shadow focus:shadow-[0_0_0_3px_hsl(var(--ring)/0.15)]"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-2xl border-border/60 bg-white pl-10 pr-11 text-sm shadow-sm transition-shadow focus:shadow-[0_0_0_3px_hsl(var(--ring)/0.15)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="text-right">
            <button className="text-xs font-semibold text-primary/80 transition-colors hover:text-primary">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              onClick={onLogin}
              className="h-12 w-full rounded-2xl text-sm font-bold shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40"
            >
              Iniciar sesión
            </Button>
          </motion.div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border/60" />
            <span className="text-xs text-muted-foreground">o continúa con</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          <motion.div whileTap={{ scale: 0.97 }}>
            <button
              type="button"
              onClick={onLogin}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-border/60 bg-white text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-secondary/60 hover:shadow-md"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Entrar con Google
            </button>
          </motion.div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <button className="font-extrabold text-primary transition-colors hover:text-primary/80">
            Regístrate
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
