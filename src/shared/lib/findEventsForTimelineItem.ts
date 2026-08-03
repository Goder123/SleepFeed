import type { BabyEvent, TimelineItem } from "../types/events";

import type { EditingItem } from "../types/editing";

export function findEventsForTimelineItem(
  item: TimelineItem,
  events: BabyEvent[],
): EditingItem | null {
  const sortedEvents = [...events].sort(
    (a, b) => a.timestamp - b.timestamp,
  );

  // -------------------------
  // КОРМЛЕНИЕ
  // -------------------------

  if (item.type === "feed") {
    const event = sortedEvents.find(
      (event) => event.id === item.id,
    );

    if (!event) {
      return null;
    }

    return {
      type: "feed",
      event,
    };
  }

  // -------------------------
  // СОН
  // -------------------------

  if (item.type === "sleep") {
    const sleepEvent = sortedEvents.find(
      (event) =>
        event.type === "sleep" &&
        event.timestamp === item.start,
    );

    if (!sleepEvent) {
      return null;
    }

    const wakeEvent = sortedEvents.find(
      (event) =>
        event.type === "wake" &&
        item.end !== undefined &&
        event.timestamp === item.end,
    );

    return {
      type: "sleep",
      sleepEvent,
      wakeEvent,
    };
  }

  // -------------------------
  // БОДРСТВОВАНИЕ
  // -------------------------

  const wakeEvent = sortedEvents.find(
    (event) =>
      event.type === "wake" &&
      event.timestamp === item.start,
  );

  if (!wakeEvent) {
    return null;
  }

  const sleepEvent = sortedEvents.find(
    (event) =>
      event.type === "sleep" &&
      item.end !== undefined &&
      event.timestamp === item.end,
  );

  return {
    type: "awake",
    wakeEvent,
    sleepEvent,
  };
}