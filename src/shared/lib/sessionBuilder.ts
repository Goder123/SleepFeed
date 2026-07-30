import type {
  AwakeSession,
  SleepSession,
} from "../types/baby";

import type { BabyEvent } from "../types/events";

interface SessionResult {
  sleepSessions: SleepSession[];
  awakeSessions: AwakeSession[];
}

export function rebuildSessions(
  events: BabyEvent[],
  now: number
): SessionResult {
  const sortedEvents = [...events].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  const sleepSessions: SleepSession[] = [];
  const awakeSessions: AwakeSession[] = [];

  let currentSleep: SleepSession | null = null;
  let currentAwake: AwakeSession | null = null;

  let status: "awake" | "sleeping" = "awake";

  if (sortedEvents.length === 0) {
    awakeSessions.push({
      id: now,
      startedAt: now,
      endedAt: null,
    });

    return {
      sleepSessions,
      awakeSessions,
    };
  }

  currentAwake = {
    id: sortedEvents[0].timestamp,
    startedAt: sortedEvents[0].timestamp,
    endedAt: null,
  };

  awakeSessions.push(currentAwake);

  for (const event of sortedEvents) {
    switch (event.type) {
      case "sleep": {
        if (status === "awake" && currentAwake) {
          currentAwake.endedAt = event.timestamp;
        }

        currentSleep = {
          id: event.id,
          startedAt: event.timestamp,
          endedAt: null,
        };

        sleepSessions.push(currentSleep);

        status = "sleeping";

        break;
      }

      case "wake": {
        if (status === "sleeping" && currentSleep) {
          currentSleep.endedAt = event.timestamp;
        }

        currentAwake = {
          id: event.id,
          startedAt: event.timestamp,
          endedAt: null,
        };

        awakeSessions.push(currentAwake);

        status = "awake";

        break;
      }

      default:
        break;
    }
  }

  if (status === "sleeping" && currentSleep) {
    currentSleep.endedAt = null;
  }

  if (status === "awake" && currentAwake) {
    currentAwake.endedAt = null;
  }

  return {
    sleepSessions: sleepSessions.reverse(),
    awakeSessions: awakeSessions.reverse(),
  };
}