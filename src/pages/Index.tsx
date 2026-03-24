import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import HomeScreen from "@/components/HomeScreen";
import PublishScreen from "@/components/PublishScreen";
import ClaimScreen from "@/components/ClaimScreen";
import ProfileScreen from "@/components/ProfileScreen";
import BottomNav from "@/components/BottomNav";
import type { Screen } from "@/components/BottomNav";
import { toast } from "sonner";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  const handleNavigate = (screen: string, itemId?: string) => {
    if (itemId) setSelectedItemId(itemId);
    setCurrentScreen(screen as Screen);
  };

  const handleLogin = () => {
    setCurrentScreen("home");
    toast.success("¡Bienvenido a No Me Lo Retai! 🤝");
  };

  const handlePublish = () => {
    setCurrentScreen("home");
    toast.success("¡Hallazgo publicado con éxito! 🎉");
  };

  const showNav = currentScreen !== "login";

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50">
      <div className="relative w-full max-w-md mx-auto h-screen md:h-[812px] overflow-hidden bg-background md:rounded-3xl md:border md:border-border md:shadow-2xl">
        <div className="relative h-full flex flex-col">
          <div className="flex-1 overflow-hidden relative">
            {currentScreen === "login" && <LoginScreen onLogin={handleLogin} />}
            {(currentScreen === "home" || currentScreen === "search" || currentScreen === "ranking") && (
              <HomeScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "publish" && (
              <PublishScreen onBack={() => setCurrentScreen("home")} onPublish={handlePublish} />
            )}
            {currentScreen === "claim" && (
              <ClaimScreen itemId={selectedItemId} onBack={() => setCurrentScreen("home")} />
            )}
            {currentScreen === "profile" && <ProfileScreen />}
          </div>
          {showNav && <BottomNav active={currentScreen} onNavigate={setCurrentScreen} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
