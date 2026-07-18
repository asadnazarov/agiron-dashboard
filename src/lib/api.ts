import type { ChecklistItem, Employee, Task, TodayReport } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "ngrok-skip-browser-warning": "true" },
  });
  if (!res.ok) {
    throw new Error(`API xatosi: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getEmployees: () => getJson<Employee[]>("/api/employees"),
  getTasks: () => getJson<Task[]>("/api/tasks"),
  getTodayReport: () => getJson<TodayReport>("/api/report/today"),
  updateChecklist: async (taskId: string, checklist: ChecklistItem[]): Promise<void> => {
    const res = await fetch(`${API_URL}/api/tasks/${taskId}/checklist`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
      body: JSON.stringify({ checklist }),
    });
    if (!res.ok) {
      throw new Error(`API xatosi: ${res.status} ${res.statusText}`);
    }
  },
};
