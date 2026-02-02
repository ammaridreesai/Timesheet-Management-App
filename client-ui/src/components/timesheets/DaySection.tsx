"use client";

import { Plus } from "lucide-react";
import { TimesheetEntry } from "@/types";
import TaskEntry from "./TaskEntry";

interface DaySectionProps {
  date: string;
  entries: TimesheetEntry[];
  onAddTask: (date: string) => void;
  onEditTask: (entry: TimesheetEntry) => void;
  onDeleteTask: (entryId: string) => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function DaySection({
  date,
  entries,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: DaySectionProps) {
  return (
    <div className="py-4">
      <div className="flex items-start">
        <div className="w-20 flex-shrink-0">
          <span className="text-sm font-medium text-gray-900">
            {formatDate(date)}
          </span>
        </div>

        <div className="flex-1 space-y-2">
          {entries.map((entry) => (
            <TaskEntry
              key={entry.id}
              entry={entry}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}

          <button
            onClick={() => onAddTask(date)}
            className="w-full py-3 px-4 border-2 border-dashed border-gray-200 rounded-lg text-sm text-[#3B5BDB] hover:border-[#3B5BDB] hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add new task
          </button>
        </div>
      </div>
    </div>
  );
}
