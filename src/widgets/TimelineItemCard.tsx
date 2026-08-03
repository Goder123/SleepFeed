import {
  ChevronRight,
  Clock3,
  Milk,
  Moon,
  Sun,
} from "lucide-react";

import type { TimelineItem } from "../shared/types/events";

import {
  formatDuration,
  formatTime,
  getTimelineItemTitle,
} from "../shared/lib/timelineFormat";

interface TimelineItemCardProps {
  item: TimelineItem;
  onClick?: () => void;
}

const styles = {
  sleep: {
    icon: Moon,
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
  },
  awake: {
    icon: Sun,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
  },
  feed: {
    icon: Milk,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
};

export default function TimelineItemCard({
  item,
  onClick,
}: TimelineItemCardProps) {
  const isFeed = item.type === "feed";

  const currentStyle = styles[item.type];
  const Icon = currentStyle.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        w-full
        rounded-3xl
        bg-slate-900
        p-4
        text-left
        ring-1
        ring-slate-800
        shadow-lg
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:ring-slate-700
        active:scale-[0.99]
      "
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${currentStyle.iconBg}`}
        >
          <Icon
            size={24}
            className={currentStyle.iconColor}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[17px] font-semibold tracking-tight text-white">
              {getTimelineItemTitle(item.type)}
            </h3>

            {!isFeed && item.duration && (
              <span className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                <Clock3 size={13} />
                {formatDuration(item.duration)}
              </span>
            )}
          </div>

          {isFeed ? (
  <div className="mt-2">
    <p className="text-3xl font-bold tracking-tight text-white">
      {formatTime(item.start)}
    </p>

    {item.sourceEvent?.feedingType && (
      <p className="mt-2 text-sm font-medium text-slate-400">
        {item.sourceEvent.feedingType === "formula"
          ? "🍼 Смесь"
          : "🤱 Грудное"}

        {item.sourceEvent.feedingType === "formula" &&
          item.sourceEvent.amount && (
            <span className="ml-2 text-emerald-400">
              {item.sourceEvent.amount} мл
            </span>
          )}
      </p>
    )}
  </div>
) : (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">
                {formatTime(item.start)}
              </span>

              <ChevronRight
                size={18}
                className="text-slate-500"
              />

              <span className="text-2xl font-bold tracking-tight text-white">
                {item.end
                  ? formatTime(item.end)
                  : "Сейчас"}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}