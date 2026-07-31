export type BabyStatus = "idle" | "awake" | "sleeping";

export interface SleepSession {
  id: number;

  type: "sleep";
  title: string;

  startedAt: number;
  endedAt: number | null;

  duration?: number;
}

export interface AwakeSession {
  id: number;

  type: "awake";
  title: string;

  startedAt: number;
  endedAt: number | null;

  duration?: number;
}

export interface FeedEvent {
  id: number;

  timestamp: number;
}