import { useState } from "react";
import { Handshake, Mail, Lock, Eye, EyeOff } from "lucide-react";
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
    <div className="flex flex-col items-center justify-center min-h-screen px-8 bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Logo */}
      <div className="flex flex-col items-center mb-10 animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
          <Handshake className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-black text-foreground tracking-tight text-center">
          NO ME LO RETAI
        </h1>
        <p className="text-sm font-semibold text-accent mt-1 tracking-wide">
          Devolver es de valientes 💪
        </p>
      </div>

      {/* Form */}
      <div className="w-full space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-11 h-12 rounded-xl bg-card border-border"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-11 pr-11 h-12 rounded-xl bg-card border-border"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
          className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98]"
        >
          Iniciar Sesión
        </Button>

        <Button
          variant="outline"
          onClick={onLogin}
          className="w-full h-12 rounded-xl text-base font-semibold border-2 gap-3 active:scale-[0.98] transition-all"
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

      {/* Register link */}
      <p className="mt-8 text-sm text-muted-foreground">
        ¿No tienes cuenta?{" "}
        <button className="text-primary font-bold hover:underline">Regístrate</button>
      </p>
    </div>
  );
};

export default LoginScreen;
