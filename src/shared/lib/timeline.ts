import type {
  TimelineDay,
  TimelineItem,
  BabyEvent,
} from "../types/events";

import type {
  SleepSession,
  AwakeSession,
} from "../types/baby";

function getDateKey(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10);
}

export function buildTimeline(
  events: BabyEvent[],
  sleepSessions: SleepSession[],
  awakeSessions: AwakeSession[],
): TimelineDay[] {
  const items: TimelineItem[] = [];

  // Кормления
  for (const event of events) {
    if (event.type !== "feed") {
      continue;
    }

    items.push({
      id: event.id,
      type: "feed",
      title: event.title,
      start: event.timestamp,
      sourceEvent: event,
    });
  }

  // Сон
  for (const session of sleepSessions) {
    items.push({
      id: session.id,
      type: session.type,
      title: session.title,
      start: session.startedAt,
      end: session.endedAt ?? undefined,
      duration: session.duration,
    });
  }

  // Бодрствование
  for (const session of awakeSessions) {
    items.push({
      id: session.id,
      type: session.type,
      title: session.title,
      start: session.startedAt,
      end: session.endedAt ?? undefined,
      duration: session.duration,
    });
  }

  items.sort((a, b) => b.start - a.start);

  const grouped = new Map<string, TimelineItem[]>();

  for (const item of items) {
    const date = getDateKey(item.start);

    const day = grouped.get(date);

    if (day) {
      day.push(item);
    } else {
      grouped.set(date, [item]);
    }
  }
  console.table(
  items.map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
  })),
);

  return Array.from(grouped.entries()).map(([date, items]) => ({
    date,
    items,
  }));
}