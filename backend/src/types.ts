export type ItemStatus = "unclaimed" | "claimed";
export type RewardIconKey = "delivery" | "health" | "coffee" | "cinema" | "retail";
export type BadgeIconKey = "firstReturn" | "streak" | "trusted" | "tenReturns" | "community" | "legend";

export interface FoundItem {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  timeAgo: string;
  imageUrl: string;
  finder: {
    name: string;
    initials: string;
    rating: number;
  };
  claims: number;
  status: ItemStatus;
  securityQuestions: { question: string; answer: string }[];
}

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
  location: string;
  joinDate: string;
  points: number;
  stats: {
    returns: number;
    recoveries: number;
    rating: number;
  };
  badges: { iconKey: BadgeIconKey; label: string; unlocked: boolean }[];
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  iconKey: RewardIconKey;
}

export interface LoginUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  points: number;
}
