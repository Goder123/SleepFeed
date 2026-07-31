export type BabyStatus = "idle" | "awake" | "sleeping";

export interface SleepSession {
  id: number;

  startedAt: number;

  endedAt: number | null;

  duration?: number;
}

export interface AwakeSession {
  id: number;

  startedAt: number;

  endedAt: number | null;

  duration?: number;
}

export interface FeedEvent {
  id: number;

  timestamp: number;
}