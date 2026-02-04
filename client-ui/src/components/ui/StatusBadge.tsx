import { TimesheetStatus } from "@/types";

interface StatusBadgeProps {
  status: TimesheetStatus;
}

const statusConfig = {
  completed: {
    label: "COMPLETED",
    className: "bg-green-100 text-green-600",
  },
  incomplete: {
    label: "INCOMPLETE",
    className: "bg-yellow-100 text-yellow-600",
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
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase ${config.className}`}
    >
      {config.label}
    </span>
  );
}
