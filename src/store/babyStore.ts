import { create } from "zustand";

export type BabyStatus = "awake" | "sleeping";

export type EventType = "sleep" | "wake" | "feed";

export interface BabyEvent {
  id: number;
  type: EventType;
  title: string;
  timestamp: number;
}

interface BabyState {
  status: BabyStatus;

  sleepStartedAt: number | null;

  lastFeedAt: number | null;

  events: BabyEvent[];

  startSleep: () => void;

  wakeUp: () => void;

  feed: () => void;
}

export const useBabyStore = create<BabyState>((set) => ({
  status: "awake",

  sleepStartedAt: null,

  lastFeedAt: null,

  events: [],

  startSleep: () => {
    const now = Date.now();

    set((state) => ({
      status: "sleeping",
      sleepStartedAt: now,
      events: [
        {
          id: now,
          type: "sleep",
          title: "Уснул",
          timestamp: now,
        },
        ...state.events,
      ],
    }));
  },

  wakeUp: () => {
    const now = Date.now();

    set((state) => ({
      status: "awake",
      sleepStartedAt: null,
      events: [
        {
          id: now,
          type: "wake",
          title: "Проснулся",
          timestamp: now,
        },
        ...state.events,
      ],
    }));
  },

  feed: () => {
    const now = Date.now();

    set((state) => ({
      lastFeedAt: now,
      events: [
        {
          id: now,
          type: "feed",
          title: "Покормил",
          timestamp: now,
        },
        ...state.events,
      ],
    }));
  },
}));