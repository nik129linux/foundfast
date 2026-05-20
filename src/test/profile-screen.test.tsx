import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProfileScreen from "@/components/ProfileScreen";

const emojiPattern = /\p{Extended_Pictographic}/u;

describe("ProfileScreen", () => {
  it("shows the localized profile and Colombian rewards without emoji text", () => {
    const { container } = render(<ProfileScreen />);

    expect(screen.getByText("Pasto, Colombia")).toBeInTheDocument();

    const rewardsSection = screen
      .getByRole("heading", { name: "Recompensas Canjeables" })
      .closest("div");

    expect(rewardsSection).not.toBeNull();

    const scoped = within(rewardsSection as HTMLElement);
    expect(scoped.getByAltText("Logo de Rappi")).toHaveAttribute("src", "/brands/rappi.png");
    expect(scoped.getByAltText("Logo de Cruz Verde")).toHaveAttribute("src", "/brands/cruz-verde.png");
    expect(scoped.getByAltText("Logo de Juan Valdez")).toHaveAttribute("src", "/brands/juan-valdez.svg");
    expect(scoped.getByAltText("Logo de Cine Colombia")).toHaveAttribute("src", "/brands/cine-colombia.png");
    expect(scoped.getByAltText("Logo de Éxito")).toHaveAttribute("src", "/brands/exito.png");
    const cinemaLabel = scoped.getByText(
      (_, element) =>
        element?.textContent?.replace(/\s+/g, " ").trim() === "Cine Colombia" &&
        element.className.includes("whitespace-pre-line"),
    );

    expect(cinemaLabel).toBeInTheDocument();

    expect(container.textContent ?? "").not.toMatch(emojiPattern);
  });
});
