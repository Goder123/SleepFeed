import type {
  TimelineDay,
  TimelineFilter,
} from "../types/events";

export function filterTimeline(
  timeline: TimelineDay[],
  filter: TimelineFilter,
): TimelineDay[] {
  if (filter === "all") {
    return timeline;
  }

  return timeline
    .map((day) => ({
      ...day,
      items: day.items.filter(
        (item) => item.type === filter,
      ),
    }))
    .filter((day) => day.items.length > 0);
}