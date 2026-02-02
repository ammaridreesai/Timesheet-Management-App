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
  switch (status) {
    case "completed":
      return "text-[#3B5BDB]";
    case "incomplete":
      return "text-[#3B5BDB]";
    case "missing":
      return "text-[#3B5BDB]";
    default:
      return "text-[#3B5BDB]";
  }
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
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Week #
                {renderSortIcon("weekNumber")}
              </div>
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Date
                {renderSortIcon("date")}
              </div>
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Status
                {renderSortIcon("status")}
              </div>
            </th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet) => (
            <tr
              key={timesheet.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-4 px-4 text-sm text-gray-900">
                {timesheet.weekNumber}
              </td>
              <td className="py-4 px-4 text-sm text-gray-600">
                {formatDateRange(timesheet.startDate, timesheet.endDate)}
              </td>
              <td className="py-4 px-4">
                <StatusBadge status={timesheet.status} />
              </td>
              <td className="py-4 px-4 text-right">
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
