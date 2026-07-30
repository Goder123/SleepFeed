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
  let currentAwake: AwakeSession = {
    id: 0,
    startedAt:
      sortedEvents.length > 0 ? sortedEvents[0].timestamp : now,
    endedAt: null,
  };

  for (const event of sortedEvents) {
    switch (event.type) {
      case "sleep": {
        // Закрываем бодрствование, если оно открыто
        if (currentAwake.endedAt === null) {
          currentAwake.endedAt = event.timestamp;

          if (
            currentAwake.startedAt <
            currentAwake.endedAt
          ) {
            awakeSessions.push(currentAwake);
          }
        }

        // Если уже есть открытый сон — заменяем его
        currentSleep = {
          id: event.id,
          startedAt: event.timestamp,
          endedAt: null,
        };

        break;
      }

      case "wake": {
        // Закрываем сон
        if (currentSleep) {
          currentSleep.endedAt = event.timestamp;

          if (
            currentSleep.startedAt <
            currentSleep.endedAt
          ) {
            sleepSessions.push(currentSleep);
          }

          currentSleep = null;
        }

        // Начинаем новое бодрствование
        currentAwake = {
          id: event.id,
          startedAt: event.timestamp,
          endedAt: null,
        };

        break;
      }

      case "feed":
        break;
    }
  }

  if (currentSleep) {
    sleepSessions.push(currentSleep);
  }

  if (
    currentAwake &&
    currentAwake.endedAt === null
  ) {
    awakeSessions.push(currentAwake);
  }

  return {
    sleepSessions: sleepSessions.reverse(),
    awakeSessions: awakeSessions.reverse(),
  };
}