import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Material } from "../lib/types";
import { MaterialStockModal } from "../components/MaterialStockModal";

export function OmborPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  async function load() {
    try {
      setMaterials(await api.getMaterials());
    } catch (e) {
      console.error("OmborPage load failed:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAddStock(materialId: string, addQuantity: number) {
    await api.addMaterialStock(materialId, addQuantity);
    setModalOpen(false);
    load();
  }

  async function handleCreate(input: { name: string; unit: string; initialQuantity: number }) {
    await api.createMaterial(input);
    setModalOpen(false);
    load();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-[220px] pt-10">
      <h1 className="font-heading text-[30px] font-semibold" style={{ color: "var(--ink)" }}>
        Ombor
      </h1>
      <p className="mt-1 text-[14px]" style={{ color: "var(--ink-soft)" }}>
        Sirye qoldiqlari
      </p>

      <div
        className="mt-6 overflow-hidden rounded-[20px] border"
        style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
      >
        {loading ? (
          <div className="px-5 py-8 text-center text-[13px]" style={{ color: "var(--ink-soft)" }}>
            Yuklanmoqda...
          </div>
        ) : materials.length === 0 ? (
          <div className="px-5 py-8 text-center text-[13px]" style={{ color: "var(--ink-soft)" }}>
            Hozircha sirye yo'q
          </div>
        ) : (
          materials.map((m, i) => (
            <div
              key={m.id}
              className="flex items-center justify-between px-5 py-4"
              style={{ borderTop: i > 0 ? "1px solid var(--border)" : "none" }}
            >
              <div>
                <div className="text-[13.5px] font-medium" style={{ color: "var(--ink)" }}>
                  {m.name}
                </div>
                <div className="mt-0.5 text-[11.5px]" style={{ color: "var(--ink-faint)" }}>
                  {m.unit}
                </div>
              </div>
              <div
                className="font-heading text-[16px] font-semibold"
                style={{ color: m.quantity < 0 ? "var(--danger)" : "var(--ink)" }}
              >
                {m.quantity} {m.unit}
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="font-heading fixed bottom-28 right-6 flex h-14 w-14 items-center justify-center rounded-full text-[26px] text-white"
        style={{ background: "var(--accent)", boxShadow: "var(--shadow-nav)" }}
        aria-label="Sirye qo'shish"
      >
        +
      </button>

      {modalOpen && (
        <MaterialStockModal
          materials={materials}
          onClose={() => setModalOpen(false)}
          onAddStock={handleAddStock}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
