interface ProgressBarProps {
  current: number;
  target: number;
}

export default function ProgressBar({ current, target }: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = current >= target;

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <span className="text-sm font-medium text-gray-900">
          {current}/{target} hrs
        </span>
      </div>
      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isComplete ? "bg-green-500" : "bg-orange-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-gray-500">{Math.round(percentage)}%</span>
    </div>
  );
}
