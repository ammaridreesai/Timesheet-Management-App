import { NextRequest, NextResponse } from "next/server";
import { mockTimesheets } from "@/data/mock";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const status = searchParams.get("status");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  let filteredTimesheets = [...mockTimesheets];

  // Filter by status
  if (status && status !== "all") {
    filteredTimesheets = filteredTimesheets.filter((t) => t.status === status);
  }

  // Filter by date range
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    filteredTimesheets = filteredTimesheets.filter((t) => {
      const timesheetStart = new Date(t.startDate);
      const timesheetEnd = new Date(t.endDate);
      return timesheetStart >= start && timesheetEnd <= end;
    });
  }

  // Sort by week number descending
  filteredTimesheets.sort((a, b) => a.weekNumber - b.weekNumber);

  // Pagination
  const total = filteredTimesheets.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginatedTimesheets = filteredTimesheets.slice(offset, offset + limit);

  return NextResponse.json({
    data: paginatedTimesheets,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
}
