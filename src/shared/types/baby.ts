export type BabyStatus = "idle" | "wake" | "sleeping";

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
  type: "wake";
}

export interface FeedEvent {
  id: number;

  timestamp: number;
}