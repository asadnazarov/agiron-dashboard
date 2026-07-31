import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Employee, Material, ProductionMaterialLine, ProductRecipe } from "../lib/types";

interface Row extends ProductionMaterialLine {
  key: number;
}

let rowKeySeq = 0;
function newRow(materials: Material[]): Row {
  const first = materials[0];
  return {
    key: rowKeySeq++,
    materialId: first?.id || "",
    materialName: first?.name || "",
    unit: first?.unit || "",
    quantity: 0,
    source: "company",
  };
}

export function ProductionEntryModal({
  recipes,
  materials,
  employees,
  onClose,
  onSave,
}: {
  recipes: ProductRecipe[];
  materials: Material[];
  employees: Employee[];
  onClose: () => void;
  onSave: (input: {
    productName: string;
    quantityProduced: number;
    createdBy: string;
    materials: ProductionMaterialLine[];
  }) => void;
}) {
  const [productName, setProductName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [quantityProduced, setQuantityProduced] = useState("1");
  const [createdBy, setCreatedBy] = useState(employees[0]?.id || "");
  const [rows, setRows] = useState<Row[]>([]);

  const suggestions = useMemo(() => {
    const q = productName.trim().toLowerCase();
    if (!q) return recipes.slice(0, 8);
    return recipes.filter((r) => r.productName.toLowerCase().includes(q)).slice(0, 8);
  }, [productName, recipes]);

  function selectProduct(name: string) {
    setProductName(name);
    setShowSuggestions(false);
    const recipe = recipes.find((r) => r.productName === name);
    if (recipe) {
      setRows(recipe.materials.map((m) => ({ ...m, key: rowKeySeq++ })));
    }
  }

  function updateRow(key: number, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }

  function updateRowMaterial(key: number, materialId: string) {
    const material = materials.find((m) => m.id === materialId);
    updateRow(key, { materialId, materialName: material?.name || "", unit: material?.unit || "" });
  }

  function removeRow(key: number) {
    setRows((prev) => prev.filter((r) => r.key !== key));
  }

  function addRow() {
    setRows((prev) => [...prev, newRow(materials)]);
  }

  function handleSave() {
    if (!productName.trim() || rows.length === 0) return;
    onSave({
      productName: productName.trim(),
      quantityProduced: Number(quantityProduced) || 1,
      createdBy,
      materials: rows.map(({ key: _key, ...line }) => line),
    });
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl p-6"
        style={{ background: "var(--surface)", boxShadow: "var(--shadow-nav)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-[18px] font-semibold" style={{ color: "var(--ink)" }}>
            Ishlab chiqarish yozuvi
          </h2>
          <button onClick={onClose} style={{ color: "var(--ink-faint)" }} aria-label="Yopish">
            ✕
          </button>
        </div>

        <Field label="Mahsulot nomi">
          <div className="relative">
            <input
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Masalan: 2 metrli krovat"
              className="w-full rounded-lg border px-3 py-2 text-[13.5px] outline-none"
              style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--ink)" }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div
                className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border"
                style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
              >
                {suggestions.map((s) => (
                  <button
                    key={s.productName}
                    onClick={() => selectProduct(s.productName)}
                    className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[var(--surface-2)]"
                    style={{ color: "var(--ink)" }}
                  >
                    {s.productName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Field>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <Field label="Necha dona">
            <input
              type="number"
              value={quantityProduced}
              onChange={(e) => setQuantityProduced(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-[13.5px] outline-none"
              style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--ink)" }}
            />
          </Field>
          <Field label="Kim tomonidan">
            <select
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-[13.5px] outline-none"
              style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--ink)" }}
            >
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 text-[12px] font-medium" style={{ color: "var(--ink-soft)" }}>
            Sarflangan sirye
          </div>
          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row.key} className="rounded-lg border p-2" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2">
                  <select
                    value={row.materialId}
                    onChange={(e) => updateRowMaterial(row.key, e.target.value)}
                    className="min-w-0 flex-1 rounded-lg border px-2 py-1.5 text-[13px] outline-none"
                    style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--ink)" }}
                  >
                    {materials.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.unit})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e) => updateRow(row.key, { quantity: Number(e.target.value) })}
                    className="w-20 rounded-lg border px-2 py-1.5 text-[13px] outline-none"
                    style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--ink)" }}
                  />
                  <button onClick={() => removeRow(row.key)} style={{ color: "var(--ink-faint)" }} aria-label="O'chirish">
                    ✕
                  </button>
                </div>
                <div className="mt-2 flex gap-1.5">
                  <SourceChip
                    active={row.source === "company"}
                    label="Bizniki"
                    onClick={() => updateRow(row.key, { source: "company" })}
                  />
                  <SourceChip
                    active={row.source === "client"}
                    label="Mijoznikini"
                    onClick={() => updateRow(row.key, { source: "client" })}
                  />
                </div>
              </div>
            ))}
          </div>
          <button onClick={addRow} className="mt-2 text-[13px] font-medium" style={{ color: "var(--accent)" }}>
            + Sirye qo'shish
          </button>
        </div>

        <button
          onClick={handleSave}
          className="font-heading mt-5 w-full rounded-xl py-2.5 text-[14px] font-semibold text-white"
          style={{ background: "var(--accent)" }}
        >
          Tasdiqlash va qo'shish
        </button>
      </div>
    </div>
  );
}

function SourceChip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-2.5 py-1 text-[11.5px] font-medium"
      style={{
        background: active ? "var(--accent-soft)" : "var(--surface-2)",
        color: active ? "var(--accent)" : "var(--ink-soft)",
      }}
    >
      {label}
    </button>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[12px] font-medium" style={{ color: "var(--ink-soft)" }}>
        {label}
      </div>
      {children}
    </div>
  );
}
