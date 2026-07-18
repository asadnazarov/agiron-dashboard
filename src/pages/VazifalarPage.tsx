import { useMemo, useState } from "react";
import type { Employee, Task } from "../lib/types";
import { TaskRow } from "../components/TaskRow";

export function VazifalarPage({ tasks, employees }: { tasks: Task[]; employees: Employee[] }) {
  const [filter, setFilter] = useState<string>("all");

  const grouped = useMemo(() => {
    const filtered = filter === "all" ? tasks : tasks.filter((t) => t.assigneeId === filter);
    return employees
      .filter((e) => filter === "all" || e.id === filter)
      .map((e) => ({
        employee: e,
        tasks: filtered
          .filter((t) => t.assigneeId === e.id)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      }))
      .filter((g) => g.tasks.length > 0);
  }, [tasks, employees, filter]);

  return (
    <div className="mx-auto max-w-5xl px-6 pb-[220px] pt-10">
      <h1 className="font-heading text-[30px] font-semibold" style={{ color: "var(--ink)" }}>
        Vazifalar
      </h1>
      <p className="mt-1 text-[14px]" style={{ color: "var(--ink-soft)" }}>
        Har bir xodimning vazifalari ro'yxati
      </p>

      <div className="mt-5 flex gap-2 overflow-x-auto">
        <FilterChip label="Hammasi" active={filter === "all"} onClick={() => setFilter("all")} />
        {employees.map((e) => (
          <FilterChip key={e.id} label={e.name} active={filter === e.id} onClick={() => setFilter(e.id)} />
        ))}
      </div>

      <div className="mt-6 space-y-6">
        {grouped.length === 0 ? (
          <div
            className="rounded-[20px] border px-5 py-8 text-center text-[13px]"
            style={{ borderColor: "var(--border)", color: "var(--ink-soft)" }}
          >
            Vazifalar topilmadi
          </div>
        ) : (
          grouped.map((g) => (
            <div
              key={g.employee.id}
              className="overflow-hidden rounded-[20px] border"
              style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="font-heading flex items-center justify-between border-b px-5 py-4 text-[16px] font-semibold"
                style={{ borderColor: "var(--border)", color: "var(--ink)" }}
              >
                <span>{g.employee.name}</span>
                <span className="text-[12px]" style={{ color: "var(--ink-faint)" }}>
                  {g.tasks.length} ta vazifa
                </span>
              </div>
              {g.tasks.map((t) => (
                <TaskRow key={t.id} task={t} assigneeName={g.employee.name} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors"
      style={{
        borderColor: "var(--border)",
        background: active ? "var(--accent-soft)" : "var(--surface)",
        color: active ? "var(--accent)" : "var(--ink-soft)",
      }}
    >
      {label}
    </button>
  );
}
