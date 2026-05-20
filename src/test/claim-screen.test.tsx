import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ClaimScreen from "@/components/ClaimScreen";

const emojiPattern = /\p{Extended_Pictographic}/u;

describe("ClaimScreen", () => {
  it("keeps the claim flow text-only after submitting", () => {
    const { container } = render(<ClaimScreen itemId="1" onBack={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Enviar Reclamo" })).toBeInTheDocument();
    expect(container.textContent ?? "").not.toMatch(emojiPattern);
  });
});
