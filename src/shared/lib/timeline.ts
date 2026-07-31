import type {
  BabyEvent,
  TimelineDay,
  TimelineItem,
} from "../types/events";

function getDateKey(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10);
}

const MIN_DURATION = 1000;

export function buildTimeline(
  events: BabyEvent[]
): TimelineDay[] {
  const sortedEvents = [...events].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  const items: TimelineItem[] = [];

  let currentSleep: TimelineItem | null = null;
  let currentAwake: TimelineItem | null = null;

  for (const event of sortedEvents) {
    switch (event.type) {
      case "feed": {
        items.push({
          id: event.id,
          type: "feed",
          title: event.title,
          start: event.timestamp,
        });

        break;
      }

      case "sleep": {
        // Уже спит — повторное событие игнорируем
        if (currentSleep) {
          break;
        }

        // Закрываем бодрствование
        if (currentAwake) {
          const duration =
            event.timestamp - currentAwake.start;

          if (duration >= MIN_DURATION) {
            currentAwake.end = event.timestamp;
            currentAwake.duration = duration;
          } else {
            items.splice(items.indexOf(currentAwake), 1);
          }

          currentAwake = null;
        }

        currentSleep = {
          id: event.id,
          type: "sleep",
          title: event.title,
          start: event.timestamp,
        };

        items.push(currentSleep);

        break;
      }

      case "wake": {
        // Уже бодрствует — повторное событие игнорируем
        if (currentAwake) {
          break;
        }

        // Закрываем сон
        if (currentSleep) {
          const duration =
            event.timestamp - currentSleep.start;

          if (duration >= MIN_DURATION) {
            currentSleep.end = event.timestamp;
            currentSleep.duration = duration;
          } else {
            items.splice(items.indexOf(currentSleep), 1);
          }

          currentSleep = null;
        }

        currentAwake = {
          id: event.id,
          type: "awake",
          title: event.title,
          start: event.timestamp,
        };

        items.push(currentAwake);

        break;
      }
    }
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

  return Array.from(grouped.entries()).map(
    ([date, items]) => ({
      date,
      items,
    })
  );
}