import { create } from "zustand";

import type {
  BabyStatus,
  SleepSession,
  AwakeSession,
} from "../shared/types/baby";

import type { BabyEvent } from "../shared/types/events";

interface BabyState {
  status: BabyStatus;

  sleepStartedAt: number | null;

  awakeStartedAt: number | null;

  lastFeedAt: number | null;

  events: BabyEvent[];

  sleepSessions: SleepSession[];

  awakeSessions: AwakeSession[];

  startSleep: () => void;

  wakeUp: () => void;

  feed: () => void;
}

export const useBabyStore = create<BabyState>((set) => ({
  status: "awake",

  sleepStartedAt: null,

  awakeStartedAt: Date.now(),

  lastFeedAt: null,

  events: [],

  sleepSessions: [],

  awakeSessions: [
    {
      id: Date.now(),
      startedAt: Date.now(),
      endedAt: null,
    },
  ],

  startSleep: () => {
    const now = Date.now();

    set((state) => ({
      status: "sleeping",

      sleepStartedAt: now,

      awakeStartedAt: null,

      awakeSessions: state.awakeSessions.map((session) =>
        session.endedAt === null
          ? {
              ...session,
              endedAt: now,
            }
          : session
      ),

      sleepSessions: [
        {
          id: now,
          startedAt: now,
          endedAt: null,
        },
        ...state.sleepSessions,
      ],

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

      awakeStartedAt: now,

      sleepSessions: state.sleepSessions.map((session) =>
        session.endedAt === null
          ? {
              ...session,
              endedAt: now,
            }
          : session
      ),

      awakeSessions: [
        {
          id: now,
          startedAt: now,
          endedAt: null,
        },
        ...state.awakeSessions,
      ],

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