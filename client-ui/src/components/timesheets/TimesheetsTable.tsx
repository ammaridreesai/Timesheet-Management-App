"use client";

import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { WeeklyTimesheet } from "@/types";
import StatusBadge from "@/components/ui/StatusBadge";

interface TimesheetsTableProps {
  timesheets: WeeklyTimesheet[];
  onSort?: (column: string) => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.toLocaleString("en-US", { month: "long" });
  const endMonth = end.toLocaleString("en-US", { month: "long" });
  const year = start.getFullYear();

  if (startMonth === endMonth) {
    return `${startDay} - ${endDay} ${startMonth}, ${year}`;
  }
  return `${startDay} ${startMonth} - ${endDay} ${endMonth}, ${year}`;
}

function getActionLabel(status: string): string {
  switch (status) {
    case "completed":
      return "View";
    case "incomplete":
      return "Update";
    case "missing":
      return "Create";
    default:
      return "View";
  }
}

function getActionColor(status: string): string {
  return "text-blue-600";
}

export default function TimesheetsTable({
  timesheets,
  onSort,
  sortColumn,
  sortDirection,
}: TimesheetsTableProps) {
  const renderSortIcon = (column: string) => {
    if (!onSort) return null;
    return (
      <button
        onClick={() => onSort(column)}
        className="ml-1 text-gray-400 hover:text-gray-600"
      >
        <ArrowUpDown className="w-3 h-3" />
      </button>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Week #
                {renderSortIcon("weekNumber")}
              </div>
            </th>
            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Date
                {renderSortIcon("date")}
              </div>
            </th>
            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Status
                {renderSortIcon("status")}
              </div>
            </th>
            <th className="text-right py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet, index) => (
            <tr
              key={timesheet.id}
              className={`hover:bg-gray-50 ${index < timesheets.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <td className="py-5 px-6 text-sm text-gray-900 font-medium">
                {timesheet.weekNumber}
              </td>
              <td className="py-5 px-6 text-sm text-blue-600">
                {formatDateRange(timesheet.startDate, timesheet.endDate)}
              </td>
              <td className="py-5 px-6">
                <StatusBadge status={timesheet.status} />
              </td>
              <td className="py-5 px-6 text-right">
                <Link
                  href={`/dashboard/timesheet/${timesheet.id}`}
                  className={`text-sm font-medium hover:underline ${getActionColor(
                    timesheet.status
                  )}`}
                >
                  {getActionLabel(timesheet.status)}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {timesheets.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No timesheets found.
        </div>
      )}
    </div>
  );
}
