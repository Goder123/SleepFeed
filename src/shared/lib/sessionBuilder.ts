import type { AwakeSession, SleepSession } from "../types/baby";
import type { BabyEvent } from "../types/events";

interface SessionResult {
  sleepSessions: SleepSession[];
  awakeSessions: AwakeSession[];
}

const MIN_DURATION = 1000;

export function rebuildSessions(events: BabyEvent[]): SessionResult {
  const sortedEvents = [...events].sort((a, b) => a.timestamp - b.timestamp);

  const sleepSessions: SleepSession[] = [];
  const awakeSessions: AwakeSession[] = [];

  let currentSleep: SleepSession | null = null;
  let currentAwake: AwakeSession | null = null;

  for (const event of sortedEvents) {
    switch (event.type) {
      case "sleep": {
        // Уже спит — повторное событие игнорируем
        if (currentSleep) {
          break;
        }

        // Закрываем бодрствование
        if (currentAwake) {
          const duration = event.timestamp - currentAwake.startedAt;

          if (duration >= MIN_DURATION) {
            currentAwake.endedAt = event.timestamp;
            currentAwake.duration = duration;
            awakeSessions.push(currentAwake);
          }

          currentAwake = null;
        }

        currentSleep = {
          id: event.id,
          type: "sleep",
          title: event.title,
          startedAt: event.timestamp,
          endedAt: null,
        };

        break;
      }

      case "wake": {
        // Уже бодрствует — повторное событие игнорируем
        if (currentAwake) {
          break;
        }

        // Закрываем сон
        if (currentSleep) {
          const duration = event.timestamp - currentSleep.startedAt;

          if (duration >= MIN_DURATION) {
            currentSleep.endedAt = event.timestamp;
            currentSleep.duration = duration;
            sleepSessions.push(currentSleep);
          }

          currentSleep = null;
        }

        currentAwake = {
          id: event.id,
          type: "wake",
          title: event.title,
          startedAt: event.timestamp,
          endedAt: null,
        };

        break;
      }

      case "feed":
        break;
    }
  }

  // Незавершённые сессии
  if (currentSleep) {
    sleepSessions.push(currentSleep);
  }

  if (currentAwake) {
    awakeSessions.push(currentAwake);
  }

  return {
    sleepSessions: sleepSessions.reverse(),
    awakeSessions: awakeSessions.reverse(),
  };
}
