import { TimesheetStatus } from "@/types";

interface StatusBadgeProps {
  status: TimesheetStatus;
}

const statusConfig = {
  completed: {
    label: "COMPLETED",
    className: "bg-green-100 text-green-700",
  },
  incomplete: {
    label: "INCOMPLETE",
    className: "bg-yellow-100 text-yellow-700",
  },
  missing: {
    label: "MISSING",
    className: "bg-red-100 text-red-600",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
