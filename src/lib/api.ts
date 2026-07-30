import type { ChecklistItem, Employee, Task, TaskStatus, TodayReport } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`API xatosi: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

async function patchJson(path: string, body: unknown): Promise<void> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`API xatosi: ${res.status} ${res.statusText}`);
  }
}

export interface TaskPatch {
  assigneeId?: string;
  description?: string;
  deadlineIso?: string;
  deadlineDisplay?: string;
  status?: TaskStatus;
  checklist?: ChecklistItem[];
}

export const api = {
  getEmployees: () => getJson<Employee[]>("/api/employees"),
  getTasks: () => getJson<Task[]>("/api/tasks"),
  getTodayReport: () => getJson<TodayReport>("/api/report/today"),
  updateChecklist: (taskId: string, checklist: ChecklistItem[]) =>
    patchJson(`/api/tasks/${taskId}/checklist`, { checklist }),
  updateTask: (taskId: string, patch: TaskPatch) => patchJson(`/api/tasks/${taskId}`, patch),
  deleteTask: async (taskId: string): Promise<void> => {
    const res = await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`API xatosi: ${res.status} ${res.statusText}`);
    }
  },
};
