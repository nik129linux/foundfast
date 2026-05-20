import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PublishScreen from "@/components/PublishScreen";

const emojiPattern = /\p{Extended_Pictographic}/u;

describe("PublishScreen", () => {
  it("renders form labels and actions without emoji text", () => {
    const { container } = render(<PublishScreen onBack={vi.fn()} onPublish={vi.fn()} />);

    expect(screen.getByText("Fotos del objeto")).toBeInTheDocument();
    expect(screen.getByText("Categoría")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Publicar Hallazgo" })).toBeInTheDocument();
    expect(container.textContent ?? "").not.toMatch(emojiPattern);
  });
});
