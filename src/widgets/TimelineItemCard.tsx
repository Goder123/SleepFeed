import type { TimelineItem } from "../shared/types/events";

import {
  formatDuration,
  formatTime,
  getTimelineItemTitle,
} from "../shared/lib/timelineFormat";

interface TimelineItemCardProps {
  item: TimelineItem;
}

export default function TimelineItemCard({
  item,
}: TimelineItemCardProps) {
  
    const isFeed = item.type === "feed";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">
          {getTimelineItemTitle(item.type)}
        </h3>

        {!isFeed && item.duration && (
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
            ⏱ {formatDuration(item.duration)}
          </span>
        )}
      </div>

      {isFeed ? (
        <>
          <p className="mt-3 text-lg font-semibold text-white">
            {formatTime(item.start)}
          </p>

          <p className="mt-1 text-slate-400">
            {item.title}
          </p>
        </>
      ) : (
        <div className="mt-3 flex items-center gap-2 text-lg font-semibold text-white">
          <span>{formatTime(item.start)}</span>

          <span className="text-slate-500">→</span>

          <span>
            {item.end
              ? formatTime(item.end)
              : "Сейчас"}
          </span>
        </div>
      )}
    </div>
  );
}