import type { ReactNode } from "react";

interface DockItem {
  key: string;
  label: string;
  icon: ReactNode;
}

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  width: 15,
  height: 15,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ITEMS: DockItem[] = [
  {
    key: "dashboard",
    label: "Bosh sahifa",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
      </svg>
    ),
  },
  {
    key: "tasks",
    label: "Vazifalar",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="m8 12 2.5 2.5L16 9" />
      </svg>
    ),
  },
];

export function BottomDock({ active, onChange }: { active: string; onChange: (key: string) => void }) {
  return (
    <nav
      className="fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1 overflow-x-auto rounded-full px-2 py-2"
      style={{
        background: "linear-gradient(180deg,#1d1c22,#0f0e13)",
        boxShadow: "var(--shadow-nav)",
        scrollbarWidth: "none",
      }}
    >
      {ITEMS.map((item) => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className="flex shrink-0 flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-colors"
            style={{
              background: isActive ? "rgba(255,255,255,0.14)" : "transparent",
              color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
            }}
          >
            {item.icon}
            <span className="font-heading text-[9.5px] font-medium whitespace-nowrap">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
