import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("App smoke flow", () => {
  it("lets the user log in and open the profile screen", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Iniciar Sesión" }));
    fireEvent.click(screen.getByRole("button", { name: "Perfil" }));

    expect(await screen.findByText("Pasto, Colombia")).toBeInTheDocument();
  });
});
