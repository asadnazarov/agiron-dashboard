import { useMemo } from "react";
import type { Employee, Task } from "../lib/types";
import { KpiRow } from "../components/KpiRow";
import { TaskRow } from "../components/TaskRow";

export function DashboardPage({ tasks, employees }: { tasks: Task[]; employees: Employee[] }) {
  const employeeById = useMemo(() => new Map(employees.map((e) => [e.id, e.name])), [employees]);
  const today = new Date().toISOString().slice(0, 10);

  const kpis = useMemo(() => {
    const open = tasks.filter((t) => t.status === "new" || t.status === "in_progress").length;
    const overdue = tasks.filter((t) => t.status === "overdue").length;
    const doneToday = tasks.filter((t) => t.status === "done" && t.completedAt.startsWith(today)).length;
    return [
      { label: "Jami vazifalar", value: tasks.length },
      { label: "Ochiq", value: open },
      { label: "Muddati o'tgan", value: overdue },
      { label: "Bugun bajarildi", value: doneToday },
    ];
  }, [tasks, today]);

  const recent = useMemo(
    () => [...tasks].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8),
    [tasks]
  );

  return (
    <div className="mx-auto max-w-5xl px-6 pb-[220px] pt-10">
      <h1 className="font-heading text-[30px] font-semibold" style={{ color: "var(--ink)" }}>
        Bosh sahifa
      </h1>
      <p className="mt-1 text-[14px]" style={{ color: "var(--ink-soft)" }}>
        Barcha xodimlar bo'yicha umumiy holat
      </p>

      <div className="mt-6">
        <KpiRow items={kpis} />
      </div>

      <div
        className="mt-6 overflow-hidden rounded-[20px] border"
        style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
      >
        <div
          className="font-heading border-b px-5 py-4 text-[16px] font-semibold"
          style={{ borderColor: "var(--border)", color: "var(--ink)" }}
        >
          So'nggi vazifalar
        </div>
        {recent.length === 0 ? (
          <div className="px-5 py-8 text-center text-[13px]" style={{ color: "var(--ink-soft)" }}>
            Hozircha vazifalar yo'q
          </div>
        ) : (
          recent.map((t) => <TaskRow key={t.id} task={t} assigneeName={employeeById.get(t.assigneeId) || t.assigneeId} />)
        )}
      </div>
    </div>
  );
}
