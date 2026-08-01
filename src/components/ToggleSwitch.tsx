export function ToggleSwitch<T extends string>({
  value,
  onChange,
  options,
  size = "md",
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  size?: "sm" | "md";
}) {
  const idx = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );
  const pad = size === "sm" ? 3 : 4;

  return (
    <div
      className="relative flex w-full select-none rounded-full"
      style={{ background: "var(--surface-2)", padding: pad }}
    >
      <div
        className="absolute rounded-full transition-transform duration-200 ease-out"
        style={{
          top: pad,
          bottom: pad,
          left: pad,
          width: `calc(${100 / options.length}% - ${pad}px)`,
          transform: `translateX(${idx * 100}%)`,
          background: "var(--accent)",
        }}
      />
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className="relative z-10 flex-1 rounded-full text-center font-medium transition-colors"
          style={{
            padding: size === "sm" ? "5px 8px" : "7px 10px",
            fontSize: size === "sm" ? "11.5px" : "12.5px",
            color: value === o.value ? "#fff" : "var(--ink-soft)",
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
