import type { TimelineItem } from "../types/events";

export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDuration(
  duration?: number,
): string | null {
  if (!duration) {
    return null;
  }

  const totalMinutes = Math.floor(duration / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return minutes > 0
      ? `${hours} ч ${minutes} мин`
      : `${hours} ч`;
  }

  return `${minutes} мин`;
}

export function getTimelineItemTitle(
  type: TimelineItem["type"],
): string {
  switch (type) {
    case "sleep":
      return "Сон";

    case "awake":
      return "Бодрствование";

    case "feed":
      return "Кормление";
  }
}