"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WeeklyTimesheet, TimesheetEntry } from "@/types";
import ProgressBar from "@/components/timesheets/ProgressBar";
import DaySection from "@/components/timesheets/DaySection";
import EntryModal from "@/components/timesheets/EntryModal";

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

function getWeekDates(startDate: string, endDate: string): string[] {
  const dates: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  const current = new Date(start);
  while (current <= end) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function groupEntriesByDate(
  entries: TimesheetEntry[]
): Record<string, TimesheetEntry[]> {
  return entries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, TimesheetEntry[]>);
}

export default function TimesheetDetailPage() {
  const params = useParams();
  const timesheetId = params.id as string;

  const [timesheet, setTimesheet] = useState<WeeklyTimesheet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);

  const fetchTimesheet = useCallback(async () => {
    try {
      const response = await fetch(`/api/timesheets/${timesheetId}`);
      if (response.ok) {
        const data = await response.json();
        setTimesheet(data);
      }
    } catch (error) {
      console.error("Failed to fetch timesheet:", error);
    } finally {
      setIsLoading(false);
    }
  }, [timesheetId]);

  useEffect(() => {
    fetchTimesheet();
  }, [fetchTimesheet]);

  const handleAddTask = (date: string) => {
    setSelectedDate(date);
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (entry: TimesheetEntry) => {
    setSelectedDate(entry.date);
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (entryId: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      const response = await fetch(
        `/api/timesheets/${timesheetId}/entries/${entryId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        fetchTimesheet();
      }
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  const handleSubmitEntry = async (data: {
    projectId: string;
    typeOfWork: string;
    taskDescription: string;
    hours: number;
  }) => {
    const url = editingEntry
      ? `/api/timesheets/${timesheetId}/entries/${editingEntry.id}`
      : `/api/timesheets/${timesheetId}/entries`;

    const method = editingEntry ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        date: selectedDate,
      }),
    });

    if (response.ok) {
      fetchTimesheet();
    } else {
      throw new Error("Failed to save entry");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B5BDB]"></div>
      </div>
    );
  }

  if (!timesheet) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Timesheet not found.</p>
        <Link
          href="/dashboard"
          className="text-[#3B5BDB] hover:underline mt-4 inline-block"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const weekDates = getWeekDates(timesheet.startDate, timesheet.endDate);
  const entriesByDate = groupEntriesByDate(timesheet.entries);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              This week&apos;s timesheet
            </h1>
          </div>
          <ProgressBar current={timesheet.totalHours} target={40} />
        </div>
        <p className="text-sm text-gray-500 ml-9">
          {formatDateRange(timesheet.startDate, timesheet.endDate)}
        </p>
      </div>

      {/* Daily Sections */}
      <div className="p-6 divide-y divide-gray-100">
        {weekDates.map((date) => (
          <DaySection
            key={date}
            date={date}
            entries={entriesByDate[date] || []}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>

      {/* Entry Modal */}
      <EntryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEntry(null);
        }}
        onSubmit={handleSubmitEntry}
        entry={editingEntry}
        date={selectedDate}
      />
    </div>
  );
}
