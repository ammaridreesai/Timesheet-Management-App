import { NextRequest, NextResponse } from "next/server";
import { mockTimesheets, mockProjects, calculateStatus } from "@/data/mock";
import { TimesheetEntry } from "@/types";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const timesheetIndex = mockTimesheets.findIndex((t) => t.id === id);

  if (timesheetIndex === -1) {
    return NextResponse.json(
      { error: "Timesheet not found" },
      { status: 404 }
    );
  }

  const project = mockProjects.find((p) => p.id === body.projectId);
  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  // Create new entry
  const newEntry: TimesheetEntry = {
    id: `${id}-${Date.now()}`,
    taskDescription: body.taskDescription,
    projectId: body.projectId,
    projectName: project.name,
    typeOfWork: body.typeOfWork,
    hours: body.hours,
    date: body.date,
  };

  // Add entry to timesheet
  mockTimesheets[timesheetIndex].entries.push(newEntry);

  // Recalculate total hours and status
  const totalHours = mockTimesheets[timesheetIndex].entries.reduce(
    (sum, entry) => sum + entry.hours,
    0
  );
  mockTimesheets[timesheetIndex].totalHours = totalHours;
  mockTimesheets[timesheetIndex].status = calculateStatus(totalHours);

  return NextResponse.json(newEntry, { status: 201 });
}
