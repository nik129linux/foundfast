import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PublishScreen from "@/components/PublishScreen";

describe("PublishScreen — seguridad XSS básica", () => {
  it("renderiza un script tag como texto plano sin ejecutarlo", () => {
    const { container } = render(<PublishScreen onBack={vi.fn()} onPublish={vi.fn()} />);

    const input = screen.getByPlaceholderText("Ej: Llavero con 3 llaves");
    fireEvent.change(input, { target: { value: "<script>alert(1)</script>" } });

    expect(container.querySelector("script")).toBeNull();
    expect(input).toHaveValue("<script>alert(1)</script>");
  });

  it("no inyecta un img tag con onerror en el DOM", () => {
    const { container } = render(<PublishScreen onBack={vi.fn()} onPublish={vi.fn()} />);

    const input = screen.getByPlaceholderText("Ej: Llavero con 3 llaves");
    fireEvent.change(input, { target: { value: '<img src=x onerror=alert(1)>' } });

    const imgs = container.querySelectorAll('img[onerror]');
    expect(imgs.length).toBe(0);
    expect(input).toHaveValue('<img src=x onerror=alert(1)>');
  });

  it("renderiza HTML en descripción como texto plano sin interpretarlo", () => {
    const { container } = render(<PublishScreen onBack={vi.fn()} onPublish={vi.fn()} />);

    const textarea = screen.getByPlaceholderText(/Describe el objeto/i);
    fireEvent.change(textarea, { target: { value: "<b>bold injection</b>" } });

    expect(container.querySelector("b")).toBeNull();
    expect(textarea).toHaveValue("<b>bold injection</b>");
  });
});
