import { NextRequest, NextResponse } from "next/server";
import { mockTimesheets, mockProjects, calculateStatus } from "@/data/mock";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; entryId: string }> }
) {
  const { id, entryId } = await params;
  const body = await request.json();
  const timesheetIndex = mockTimesheets.findIndex((t) => t.id === id);

  if (timesheetIndex === -1) {
    return NextResponse.json(
      { error: "Timesheet not found" },
      { status: 404 }
    );
  }

  const entryIndex = mockTimesheets[timesheetIndex].entries.findIndex(
    (e) => e.id === entryId
  );

  if (entryIndex === -1) {
    return NextResponse.json(
      { error: "Entry not found" },
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

  // Update entry
  mockTimesheets[timesheetIndex].entries[entryIndex] = {
    ...mockTimesheets[timesheetIndex].entries[entryIndex],
    taskDescription: body.taskDescription,
    projectId: body.projectId,
    projectName: project.name,
    typeOfWork: body.typeOfWork,
    hours: body.hours,
    date: body.date,
  };

  // Recalculate total hours and status
  const totalHours = mockTimesheets[timesheetIndex].entries.reduce(
    (sum, entry) => sum + entry.hours,
    0
  );
  mockTimesheets[timesheetIndex].totalHours = totalHours;
  mockTimesheets[timesheetIndex].status = calculateStatus(totalHours);

  return NextResponse.json(mockTimesheets[timesheetIndex].entries[entryIndex]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; entryId: string }> }
) {
  const { id, entryId } = await params;
  const timesheetIndex = mockTimesheets.findIndex((t) => t.id === id);

  if (timesheetIndex === -1) {
    return NextResponse.json(
      { error: "Timesheet not found" },
      { status: 404 }
    );
  }

  const entryIndex = mockTimesheets[timesheetIndex].entries.findIndex(
    (e) => e.id === entryId
  );

  if (entryIndex === -1) {
    return NextResponse.json(
      { error: "Entry not found" },
      { status: 404 }
    );
  }

  // Remove entry
  mockTimesheets[timesheetIndex].entries.splice(entryIndex, 1);

  // Recalculate total hours and status
  const totalHours = mockTimesheets[timesheetIndex].entries.reduce(
    (sum, entry) => sum + entry.hours,
    0
  );
  mockTimesheets[timesheetIndex].totalHours = totalHours;
  mockTimesheets[timesheetIndex].status = calculateStatus(totalHours);

  return NextResponse.json({ success: true });
}
