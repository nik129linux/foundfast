import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import HomeScreen from "@/components/HomeScreen";
import PublishScreen from "@/components/PublishScreen";
import ClaimScreen from "@/components/ClaimScreen";
import ProfileScreen from "@/components/ProfileScreen";
import RankingScreen from "@/components/RankingScreen";
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
    toast.success("Bienvenido a FoundFast");
  };

  const handlePublish = () => {
    setCurrentScreen("home");
    toast.success("Hallazgo publicado con éxito");
  };

  const showNav = currentScreen !== "login";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(160deg,hsl(var(--background))_0%,hsl(var(--secondary))_100%)] px-0 md:px-8">
      <div className="relative mx-auto h-screen w-full max-w-md overflow-hidden bg-background md:h-[812px] md:rounded-[34px] md:border md:border-border/70 md:shadow-[0_30px_80px_-32px_hsl(var(--primary)/0.45)]">
        <div className="relative h-full flex flex-col">
          <div className="flex-1 overflow-hidden relative">
            {currentScreen === "login" && <LoginScreen onLogin={handleLogin} />}
            {(currentScreen === "home" || currentScreen === "search") && (
              <HomeScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "ranking" && <RankingScreen />}
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
