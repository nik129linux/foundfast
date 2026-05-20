import type { FoundItem, Reward, UserProfile } from "@/data/mockData";

type LoginUser = { id: string; name: string; email: string; initials: string; points: number };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { credentials: "include", ...init });
  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { message?: string };
    const err = Object.assign(new Error(body.message ?? `HTTP ${res.status}`), { status: res.status });
    throw err;
  }
  return res.json() as Promise<T>;
}

export const api = {
  login(email: string, password: string) {
    return request<{ token: string; user: LoginUser }>("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  },

  logout() {
    return request<{ success: boolean }>("/api/auth/logout", { method: "POST" });
  },

  getItems(q?: string, category?: string) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category && category !== "Todos") params.set("category", category);
    const qs = params.toString();
    return request<FoundItem[]>(`/api/items${qs ? `?${qs}` : ""}`);
  },

  getItem(id: string) {
    return request<FoundItem>(`/api/items/${id}`);
  },

  createItem(data: Pick<FoundItem, "title" | "category" | "description" | "location">) {
    return request<FoundItem>("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  async claimItem(id: string, answer: string): Promise<{ success: boolean; item: FoundItem | null }> {
    const res = await fetch(`/api/items/${id}/claim`, {
      credentials: "include",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    });
    if (res.status === 403) return { success: false, item: null };
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<{ success: boolean; item: FoundItem }>;
  },

  getProfile() {
    return request<UserProfile & { rewards: Reward[] }>("/api/profile");
  },

  redeemReward(rewardId: string) {
    return request<{ success: boolean; points: number }>(`/api/profile/redeem/${rewardId}`, {
      method: "POST",
    });
  },
};
