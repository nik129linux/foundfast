import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NotFound from "@/pages/NotFound";

describe("NotFound", () => {
  const renderNotFound = () =>
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

  it("muestra el código 404 al usuario", () => {
    renderNotFound();
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("muestra un mensaje de error comprensible", () => {
    renderNotFound();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it("tiene un enlace para volver al inicio", () => {
    renderNotFound();
    const link = screen.getByRole("link", { name: /return to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
