import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  Bike,
  Clapperboard,
  Coffee,
  FileText,
  Gift,
  KeyRound,
  Package,
  PawPrint,
  Pill,
  Search,
  Shirt,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Star,
} from "lucide-react";
import type { BadgeIconKey, RewardIconKey } from "@/data/mockData";

export const categoryIcons: Record<string, LucideIcon> = {
  Todos: Search,
  Documentos: FileText,
  Electrónica: Smartphone,
  Llaves: KeyRound,
  Ropa: Shirt,
  Mascotas: PawPrint,
  Otros: Package,
};

export const itemIcons: Record<string, LucideIcon> = {
  Documentos: FileText,
  Electrónica: Smartphone,
  Llaves: KeyRound,
  Ropa: Shirt,
  Mascotas: PawPrint,
  Otros: Package,
};

export const rewardIcons: Record<RewardIconKey, LucideIcon> = {
  delivery: Bike,
  health: Pill,
  coffee: Coffee,
  cinema: Clapperboard,
  retail: ShoppingBag,
};

export const badgeIcons: Record<BadgeIconKey, LucideIcon> = {
  firstReturn: BadgeCheck,
  streak: Award,
  trusted: ShieldCheck,
  tenReturns: Star,
  community: Gift,
  legend: Award,
};
