import type { TaskStatus } from "../lib/types";

const STATUS_LABEL: Record<TaskStatus, string> = {
  new: "Yangi",
  in_progress: "Jarayonda",
  done: "Bajarildi",
  overdue: "Muddati o'tgan",
};

const STATUS_STYLE: Record<TaskStatus, { bg: string; fg: string }> = {
  new: { bg: "var(--surface-2)", fg: "var(--ink-soft)" },
  in_progress: { bg: "var(--accent-soft)", fg: "var(--accent)" },
  done: { bg: "var(--success-soft)", fg: "var(--success)" },
  overdue: { bg: "var(--danger-soft)", fg: "var(--danger)" },
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  const style = STATUS_STYLE[status];
  return (
    <span
      className="font-heading inline-flex items-center rounded-full px-2.5 py-1 text-[11.5px] font-medium"
      style={{ background: style.bg, color: style.fg }}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
