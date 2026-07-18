export interface Employee {
  id: string;
  name: string;
  telegramChatId: string;
  role: string;
  responsibilities: string;
}

export type TaskStatus = "new" | "in_progress" | "done" | "overdue";

export interface ChecklistItem {
  text: string;
  done: boolean;
}

export interface Task {
  id: string;
  createdAt: string;
  createdBy: string;
  assigneeId: string;
  description: string;
  deadlineIso: string;
  deadlineDisplay: string;
  status: TaskStatus;
  completedAt: string;
  lastReminderAt: string;
  source: "voice" | "text";
  checklist: ChecklistItem[];
}

export interface ReportRow {
  employee: Employee;
  open: number;
  overdue: number;
  doneToday: number;
}

export interface TodayReport {
  date: string;
  report: ReportRow[];
}
