import type { Task } from "../lib/types";
import { StatusBadge } from "./StatusBadge";

export function TaskRow({ task, assigneeName }: { task: Task; assigneeName: string }) {
  const done = task.status === "done";
  return (
    <div
      className="flex items-center gap-4 border-b px-5 py-4 last:border-b-0"
      style={{ borderColor: "var(--border)" }}
    >
      <span
        className="flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[6px] border"
        style={{
          background: done ? "var(--accent)" : "transparent",
          borderColor: done ? "var(--accent)" : "var(--border)",
        }}
      >
        {done && (
          <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="#fff" strokeWidth={2.4}>
            <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div
          className="truncate text-[13.5px] font-medium"
          style={{
            color: done ? "var(--ink-faint)" : "var(--ink)",
            textDecoration: done ? "line-through" : "none",
          }}
        >
          {task.description}
        </div>
        <div className="mt-0.5 text-[12px]" style={{ color: "var(--ink-soft)" }}>
          {assigneeName}
        </div>
      </div>

      <StatusBadge status={task.status} />

      <div className="w-28 shrink-0 text-right text-[12px]" style={{ color: "var(--ink-soft)" }}>
        {task.deadlineDisplay || "—"}
      </div>
    </div>
  );
}
