import { User, Project, WeeklyTimesheet, TimesheetEntry } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  },
];

// Mock credentials for login
export const mockCredentials = {
  email: "john@example.com",
  password: "password123",
};

// Mock Projects
export const mockProjects: Project[] = [
  { id: "1", name: "Website Redesign" },
  { id: "2", name: "Mobile App Development" },
  { id: "3", name: "API Integration" },
  { id: "4", name: "Database Migration" },
];

// Types of work
export const workTypes = [
  "Bug fixes",
  "Feature Development",
  "Code Review",
  "Documentation",
  "Testing",
  "Meeting",
  "Research",
];

// Helper to calculate status based on hours
export function calculateStatus(totalHours: number): "completed" | "incomplete" | "missing" {
  if (totalHours === 0) return "missing";
  if (totalHours >= 40) return "completed";
  return "incomplete";
}

// Mock Timesheet Entries
const generateEntries = (weekId: string, startDate: Date): TimesheetEntry[] => {
  const entries: TimesheetEntry[] = [];
  const projectNames = ["Homepage Development", "API Integration", "Bug Fixes", "Code Review"];

  for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayOffset);
    const dateStr = date.toISOString().split("T")[0];

    // Add 1-3 entries per day
    const entriesPerDay = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < entriesPerDay; i++) {
      const projectIndex = Math.floor(Math.random() * mockProjects.length);
      entries.push({
        id: `${weekId}-${dayOffset}-${i}`,
        taskDescription: projectNames[Math.floor(Math.random() * projectNames.length)],
        projectId: mockProjects[projectIndex].id,
        projectName: mockProjects[projectIndex].name,
        typeOfWork: workTypes[Math.floor(Math.random() * workTypes.length)],
        hours: Math.floor(Math.random() * 4) + 2,
        date: dateStr,
      });
    }
  }

  return entries;
};

// Generate mock weekly timesheets for 2024
export const generateMockTimesheets = (): WeeklyTimesheet[] => {
  const timesheets: WeeklyTimesheet[] = [];
  const year = 2024;

  // Week 1: Jan 1-5, 2024 (Completed - 40 hours)
  const week1Entries: TimesheetEntry[] = [
    { id: "1-1", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 8, date: "2024-01-01" },
    { id: "1-2", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 8, date: "2024-01-02" },
    { id: "1-3", taskDescription: "API Integration", projectId: "3", projectName: "API Integration", typeOfWork: "Feature Development", hours: 8, date: "2024-01-03" },
    { id: "1-4", taskDescription: "Code Review", projectId: "1", projectName: "Website Redesign", typeOfWork: "Code Review", hours: 8, date: "2024-01-04" },
    { id: "1-5", taskDescription: "Bug Fixes", projectId: "2", projectName: "Mobile App Development", typeOfWork: "Bug fixes", hours: 8, date: "2024-01-05" },
  ];

  timesheets.push({
    id: "1",
    weekNumber: 1,
    startDate: "2024-01-01",
    endDate: "2024-01-05",
    year,
    totalHours: 40,
    status: "completed",
    entries: week1Entries,
  });

  // Week 2: Jan 8-12, 2024 (Completed - 40 hours)
  const week2Entries: TimesheetEntry[] = [
    { id: "2-1", taskDescription: "Database Setup", projectId: "4", projectName: "Database Migration", typeOfWork: "Feature Development", hours: 8, date: "2024-01-08" },
    { id: "2-2", taskDescription: "Schema Design", projectId: "4", projectName: "Database Migration", typeOfWork: "Feature Development", hours: 8, date: "2024-01-09" },
    { id: "2-3", taskDescription: "Data Migration", projectId: "4", projectName: "Database Migration", typeOfWork: "Feature Development", hours: 8, date: "2024-01-10" },
    { id: "2-4", taskDescription: "Testing", projectId: "4", projectName: "Database Migration", typeOfWork: "Testing", hours: 8, date: "2024-01-11" },
    { id: "2-5", taskDescription: "Documentation", projectId: "4", projectName: "Database Migration", typeOfWork: "Documentation", hours: 8, date: "2024-01-12" },
  ];

  timesheets.push({
    id: "2",
    weekNumber: 2,
    startDate: "2024-01-08",
    endDate: "2024-01-12",
    year,
    totalHours: 40,
    status: "completed",
    entries: week2Entries,
  });

  // Week 3: Jan 15-19, 2024 (Incomplete - 20 hours)
  const week3Entries: TimesheetEntry[] = [
    { id: "3-1", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-15" },
    { id: "3-2", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-16" },
    { id: "3-3", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-17" },
    { id: "3-4", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-18" },
    { id: "3-5", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-19" },
  ];

  timesheets.push({
    id: "3",
    weekNumber: 3,
    startDate: "2024-01-15",
    endDate: "2024-01-19",
    year,
    totalHours: 20,
    status: "incomplete",
    entries: week3Entries,
  });

  // Week 4: Jan 22-26, 2024 (Completed - 40 hours)
  const week4Entries: TimesheetEntry[] = [
    { id: "4-1", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-22" },
    { id: "4-1b", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-22" },
    { id: "4-2", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-23" },
    { id: "4-2b", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-23" },
    { id: "4-3", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-24" },
    { id: "4-3b", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-24" },
    { id: "4-4", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-25" },
    { id: "4-4b", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-25" },
    { id: "4-5", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-26" },
    { id: "4-5b", taskDescription: "Homepage Development", projectId: "1", projectName: "Website Redesign", typeOfWork: "Feature Development", hours: 4, date: "2024-01-26" },
  ];

  timesheets.push({
    id: "4",
    weekNumber: 4,
    startDate: "2024-01-22",
    endDate: "2024-01-26",
    year,
    totalHours: 40,
    status: "completed",
    entries: week4Entries,
  });

  // Week 5: Jan 28 - Feb 1, 2024 (Missing - 0 hours)
  timesheets.push({
    id: "5",
    weekNumber: 5,
    startDate: "2024-01-28",
    endDate: "2024-02-01",
    year,
    totalHours: 0,
    status: "missing",
    entries: [],
  });

  // Generate more weeks for pagination
  for (let week = 6; week <= 20; week++) {
    const startDate = new Date(2024, 1, (week - 5) * 7);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 4);

    const totalHours = week % 3 === 0 ? 0 : week % 2 === 0 ? 40 : Math.floor(Math.random() * 30) + 10;

    timesheets.push({
      id: String(week),
      weekNumber: week,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      year,
      totalHours,
      status: calculateStatus(totalHours),
      entries: totalHours > 0 ? generateEntries(String(week), startDate) : [],
    });
  }

  return timesheets;
};

// Store timesheets in memory (simulating a database)
export let mockTimesheets: WeeklyTimesheet[] = generateMockTimesheets();

// Helper function to reset mock data
export const resetMockData = () => {
  mockTimesheets = generateMockTimesheets();
};
