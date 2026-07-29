export type BabyStatus = "awake" | "sleeping";

export interface SleepSession {
  id: number;

  startedAt: number;

  endedAt: number | null;
}

export interface AwakeSession {
  id: number;

  startedAt: number;

  endedAt: number | null;
}

export interface FeedEvent {
  id: number;

  timestamp: number;
}