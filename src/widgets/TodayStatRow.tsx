import type { LucideIcon } from "lucide-react";
import { Pencil, Plus } from "lucide-react";

export type TodayStatType = "sleep" | "awake" | "feed";

interface TodayStatRowProps {
  type: TodayStatType;
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string | number;
  editTitle: string;
  addTitle: string;
  onEdit?: (type: TodayStatType) => void;
  onAdd?: (type: TodayStatType) => void;
}

export default function TodayStatRow({
  type,
  icon: Icon,
  iconColor,
  label,
  value,
  editTitle,
  addTitle,
  onEdit,
  onAdd,
}: TodayStatRowProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-2xl bg-slate-50 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <Icon
          size={22}
          className={`shrink-0 ${iconColor}`}
        />

        <span className="font-medium text-slate-900">
          {label}
        </span>
      </div>

      <span className="whitespace-nowrap font-mono text-lg font-bold text-slate-900">
        {value}
      </span>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onEdit?.(type)}
          className="rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
          title={editTitle}
        >
          <Pencil size={16} />
        </button>

        <button
          type="button"
          onClick={() => onAdd?.(type)}
          className="rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
          title={addTitle}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}