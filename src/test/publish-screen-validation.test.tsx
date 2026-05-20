import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PublishScreen from "@/components/PublishScreen";

vi.mock("@/lib/api", () => ({
  api: {
    createItem: vi.fn().mockResolvedValue({ id: "new-1", title: "Billetera negra con documentos" }),
  },
}));

describe("PublishScreen — validación de campos obligatorios", () => {
  it("no llama onPublish cuando todos los campos están vacíos", () => {
    const onPublish = vi.fn();
    render(<PublishScreen onBack={vi.fn()} onPublish={onPublish} />);

    fireEvent.click(screen.getByRole("button", { name: "Publicar Hallazgo" }));

    expect(onPublish).not.toHaveBeenCalled();
  });

  it("muestra error de título cuando el campo está vacío al intentar publicar", () => {
    render(<PublishScreen onBack={vi.fn()} onPublish={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Publicar Hallazgo" }));

    expect(screen.getByText("El título es obligatorio")).toBeInTheDocument();
  });

  it("muestra error de ubicación cuando el campo está vacío al intentar publicar", () => {
    render(<PublishScreen onBack={vi.fn()} onPublish={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Publicar Hallazgo" }));

    expect(screen.getByText("La ubicación es obligatoria")).toBeInTheDocument();
  });

  it("llama onPublish cuando título, categoría y ubicación están completos", async () => {
    const onPublish = vi.fn();
    render(<PublishScreen onBack={vi.fn()} onPublish={onPublish} />);

    fireEvent.change(screen.getByPlaceholderText("Ej: Llavero con 3 llaves"), {
      target: { value: "Billetera negra con documentos" },
    });
    fireEvent.change(screen.getByPlaceholderText("¿Dónde lo encontraste?"), {
      target: { value: "Plaza de Nariño, Pasto" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Documentos" }));
    fireEvent.click(screen.getByRole("button", { name: "Publicar Hallazgo" }));

    await screen.findByRole("button", { name: "Publicar Hallazgo" }); // wait for async
    expect(onPublish).toHaveBeenCalledTimes(1);
  });
});
