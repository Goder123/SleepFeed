export type BabyStatus = "idle" | "awake" | "sleeping";

interface BaseSession {
  id: number;

  title: string;

  startedAt: number;
  endedAt: number | null;

  duration?: number;
}

export interface SleepSession extends BaseSession {
  type: "sleep";
}

export interface AwakeSession extends BaseSession {
  type: "awake";
}

export interface FeedEvent {
  id: number;

  timestamp: number;
}