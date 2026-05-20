import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ClaimScreen from "@/components/ClaimScreen";

vi.mock("@/lib/api", () => ({
  api: {
    getItem: vi.fn().mockResolvedValue({
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
      securityQuestions: [
        { question: "¿Cuántas llaves tiene el llavero?", answer: "3" },
        { question: "¿De qué color es la cinta del llavero?", answer: "negra" },
      ],
    }),
    claimItem: vi.fn().mockResolvedValue({ success: false, item: null }),
  },
}));

const emojiPattern = /\p{Extended_Pictographic}/u;

describe("ClaimScreen", () => {
  it("keeps the claim flow text-only after submitting", async () => {
    const { container } = render(<ClaimScreen itemId="1" onBack={vi.fn()} />);

    expect(await screen.findByRole("button", { name: "Enviar Reclamo" })).toBeInTheDocument();
    expect(container.textContent ?? "").not.toMatch(emojiPattern);
  });
});
