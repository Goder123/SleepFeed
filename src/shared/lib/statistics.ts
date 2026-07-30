import type {
  SleepSession,
  AwakeSession,
} from "../types/baby";

export function getStartOfToday() {
  const now = new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
}

export function calculateTodaySleep(
  sessions: SleepSession[],
  now: number
) {
  const dayStart = getStartOfToday();

  let total = 0;

  for (const session of sessions) {
    const start = Math.max(session.startedAt, dayStart);
    const end = session.endedAt ?? now;

    if (end > dayStart) {
      total += Math.max(0, end - start);
    }
  }

  return total;
}

export function calculateTodayAwake(
  sessions: AwakeSession[],
  now: number
) {
  const dayStart = getStartOfToday();

  let total = 0;

  for (const session of sessions) {
    const start = Math.max(session.startedAt, dayStart);
    const end = session.endedAt ?? now;

    if (end > dayStart) {
      total += Math.max(0, end - start);
    }
  }

  return total;
}

export function calculateTodayFeeds(feedCount: number) {
  return feedCount;
}