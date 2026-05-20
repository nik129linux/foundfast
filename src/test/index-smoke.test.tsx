import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "@/App";

vi.mock("@/lib/api", () => ({
  api: {
    login: vi.fn().mockResolvedValue({
      token: "test-token",
      user: { id: "1", name: "Valentina Rosero", email: "test@test.com", initials: "VR", points: 1250 },
    }),
    getItems: vi.fn().mockResolvedValue([]),
    getProfile: vi.fn().mockResolvedValue({
      name: "Valentina Rosero",
      email: "test@test.com",
      initials: "VR",
      location: "Pasto, Colombia",
      joinDate: "Febrero 2026",
      points: 1250,
      stats: { returns: 12, recoveries: 3, rating: 4.9 },
      badges: [],
      rewards: [],
    }),
  },
}));

describe("App smoke flow", () => {
  it("lets the user log in and open the profile screen", async () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));
    fireEvent.click(await screen.findByRole("button", { name: "Perfil" }));

    expect(await screen.findByText("Pasto, Colombia")).toBeInTheDocument();
  });
});
