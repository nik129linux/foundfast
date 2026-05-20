import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomeScreen from "@/components/HomeScreen";

vi.mock("@/lib/api", () => ({
  api: {
    getItems: vi.fn().mockResolvedValue([
      {
        id: "1",
        title: "Llavero metálico con tres llaves",
        category: "Llaves",
        description: "Encontrado junto a una banca frente a la Alcaldía.",
        location: "Plaza de Nariño, Pasto",
        date: "2026-03-23",
        timeAgo: "Hace 1 hora",
        imageUrl: "",
        finder: { name: "Laura M.", initials: "LM", rating: 4.8 },
        claims: 0,
        status: "unclaimed",
        securityQuestions: [{ question: "¿Cuántas llaves?", answer: "3" }],
      },
    ]),
  },
}));

const emojiPattern = /\p{Extended_Pictographic}/u;

describe("HomeScreen", () => {
  it("renders Pasto references and removes Venezuelan references and emoji text", async () => {
    const { container } = render(<HomeScreen onNavigate={vi.fn()} />);

    expect(await screen.findByText(/Plaza de Nariño/i)).toBeInTheDocument();
    expect(screen.queryByText(/Caracas/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Venezuela/i)).not.toBeInTheDocument();
    expect(container.textContent ?? "").not.toMatch(emojiPattern);
  });
});
