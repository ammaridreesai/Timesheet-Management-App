import { NextRequest, NextResponse } from "next/server";
import { mockTimesheets, calculateStatus } from "@/data/mock";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const timesheet = mockTimesheets.find((t) => t.id === id);

  if (!timesheet) {
    return NextResponse.json(
      { error: "Timesheet not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(timesheet);
}

export async function PUT(
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

  // Update the timesheet
  mockTimesheets[timesheetIndex] = {
    ...mockTimesheets[timesheetIndex],
    ...body,
  };

  // Recalculate total hours and status
  const totalHours = mockTimesheets[timesheetIndex].entries.reduce(
    (sum, entry) => sum + entry.hours,
    0
  );
  mockTimesheets[timesheetIndex].totalHours = totalHours;
  mockTimesheets[timesheetIndex].status = calculateStatus(totalHours);

  return NextResponse.json(mockTimesheets[timesheetIndex]);
}
