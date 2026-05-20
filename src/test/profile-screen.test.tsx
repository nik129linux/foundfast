import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProfileScreen from "@/components/ProfileScreen";

vi.mock("@/lib/api", () => ({
  api: {
    getProfile: vi.fn().mockResolvedValue({
      name: "Valentina Rosero",
      email: "valentina.rosero@email.com",
      initials: "VR",
      location: "Pasto, Colombia",
      joinDate: "Febrero 2026",
      points: 1250,
      stats: { returns: 12, recoveries: 3, rating: 4.9 },
      badges: [
        { iconKey: "firstReturn", label: "Primera devolución", unlocked: true },
        { iconKey: "streak", label: "Racha de 3", unlocked: true },
        { iconKey: "trusted", label: "Confianza alta", unlocked: true },
        { iconKey: "tenReturns", label: "10 devoluciones", unlocked: true },
        { iconKey: "community", label: "Comunidad activa", unlocked: false },
        { iconKey: "legend", label: "Referente local", unlocked: false },
      ],
      rewards: [
        { id: "1", title: "Crédito para domicilio", description: "Úsalo en tu próximo pedido.", pointsCost: 250, iconKey: "delivery" },
        { id: "2", title: "Descuento en cuidado personal", description: "Aplica a productos seleccionados.", pointsCost: 220, iconKey: "health" },
        { id: "3", title: "Bebida mediana", description: "Disponible en tienda participante.", pointsCost: 180, iconKey: "coffee" },
        { id: "4", title: "Entrada general 2D", description: "Válida de lunes a jueves.", pointsCost: 800, iconKey: "cinema" },
        { id: "5", title: "Descuento para compras", description: "Redímelo en tienda física.", pointsCost: 360, iconKey: "retail" },
      ],
    }),
  },
}));

const emojiPattern = /\p{Extended_Pictographic}/u;

describe("ProfileScreen", () => {
  it("shows the localized profile and Colombian rewards without emoji text", async () => {
    const { container } = render(<ProfileScreen />);

    expect(await screen.findByText("Pasto, Colombia")).toBeInTheDocument();

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
