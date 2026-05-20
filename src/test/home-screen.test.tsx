import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomeScreen from "@/components/HomeScreen";

const emojiPattern = /\p{Extended_Pictographic}/u;

describe("HomeScreen", () => {
  it("renders Pasto references and removes Venezuelan references and emoji text", () => {
    const { container } = render(<HomeScreen onNavigate={vi.fn()} />);

    expect(screen.getByText(/Plaza de Nariño/i)).toBeInTheDocument();
    expect(screen.queryByText(/Caracas/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Venezuela/i)).not.toBeInTheDocument();
    expect(container.textContent ?? "").not.toMatch(emojiPattern);
  });
});
