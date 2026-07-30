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
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <Icon
          size={22}
          className={`shrink-0 ${iconColor}`}
        />

        <span className="flex-1 font-medium text-slate-900">
          {label}
        </span>

        <button
          type="button"
          onClick={() => onEdit?.(type)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
          title={editTitle}
        >
          <Pencil size={16} />
        </button>

        <button
          type="button"
          onClick={() => onAdd?.(type)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
          title={addTitle}
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="mt-3 pl-[34px]">
        <span className="font-mono text-2xl font-bold text-slate-900">
          {value}
        </span>
      </div>
    </div>
  );
}