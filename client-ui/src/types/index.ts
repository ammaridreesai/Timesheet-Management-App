export type TimesheetStatus = "completed" | "incomplete" | "missing";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
}

export interface TimesheetEntry {
  id: string;
  taskDescription: string;
  projectId: string;
  projectName: string;
  typeOfWork: string;
  hours: number;
  date: string;
}

export interface WeeklyTimesheet {
  id: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  year: number;
  totalHours: number;
  status: TimesheetStatus;
  entries: TimesheetEntry[];
}

export interface CreateEntryPayload {
  projectId: string;
  typeOfWork: string;
  taskDescription: string;
  hours: number;
  date: string;
}

export interface UpdateEntryPayload extends CreateEntryPayload {
  id: string;
}
