interface Kpi {
  label: string;
  value: string | number;
}

export function KpiRow({ items }: { items: Kpi[] }) {
  return (
    <div
      className="grid rounded-[20px] border"
      style={{ borderColor: "var(--border)", gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
    >
      {items.map((item, i) => (
        <div
          key={item.label}
          className="px-6 py-[26px]"
          style={{ borderRight: i < items.length - 1 ? "1px solid var(--border)" : "none" }}
        >
          <div
            className="font-heading text-[11.5px] font-medium uppercase"
            style={{ color: "var(--ink-faint)", letterSpacing: "0.07em" }}
          >
            {item.label}
          </div>
          <div className="font-heading mt-2 text-[27px] font-semibold" style={{ color: "var(--ink)" }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
