"use client";

import { useState, useEffect, useCallback } from "react";
import Select from "@/components/ui/Select";
import Pagination from "@/components/ui/Pagination";
import TimesheetsTable from "@/components/timesheets/TimesheetsTable";
import { WeeklyTimesheet } from "@/types";

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "completed", label: "Completed" },
  { value: "incomplete", label: "Incomplete" },
  { value: "missing", label: "Missing" },
];

const limitOptions = [
  { value: "5", label: "5 per page" },
  { value: "10", label: "10 per page" },
  { value: "20", label: "20 per page" },
];

export default function DashboardPage() {
  const [timesheets, setTimesheets] = useState<WeeklyTimesheet[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTimesheets = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      if (startDate) {
        params.append("startDate", startDate);
      }
      if (endDate) {
        params.append("endDate", endDate);
      }

      const response = await fetch(`/api/timesheets?${params}`);
      const data = await response.json();

      setTimesheets(data.data);
      setPagination((prev) => ({
        ...prev,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      }));
    } catch (error) {
      console.error("Failed to fetch timesheets:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, statusFilter, startDate, endDate]);

  useEffect(() => {
    fetchTimesheets();
  }, [fetchTimesheets]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: string) => {
    setPagination((prev) => ({ ...prev, limit: parseInt(limit), page: 1 }));
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleDateRangeChange = (type: "start" | "end", value: string) => {
    if (type === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">
          Your Timesheets
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateRangeChange("start", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3B5BDB] focus:border-transparent outline-none"
              placeholder="Start Date"
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleDateRangeChange("end", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3B5BDB] focus:border-transparent outline-none"
              placeholder="End Date"
            />
          </div>

          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            options={statusOptions}
            className="w-40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B5BDB]"></div>
          </div>
        )}
        <TimesheetsTable timesheets={timesheets} />
      </div>

      {/* Footer with Pagination */}
      <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Select
          value={pagination.limit.toString()}
          onChange={handleLimitChange}
          options={limitOptions}
          className="w-32"
        />

        {pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
