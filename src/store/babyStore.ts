import { create } from "zustand";
import { persist } from "zustand/middleware";

import { rebuildSessions } from "../shared/lib/sessionBuilder";

import type {
  AwakeSession,
  BabyStatus,
  SleepSession,
} from "../shared/types/baby";

import type { BabyEvent } from "../shared/types/events";
import type { BabyProfile } from "../shared/types/profile";

interface BabyState {
  status: BabyStatus;

  sleepStartedAt: number | null;
  awakeStartedAt: number | null;
  lastFeedAt: number | null;

  profile: BabyProfile;

  events: BabyEvent[];

  sleepSessions: SleepSession[];
  awakeSessions: AwakeSession[];

  startSleep: () => void;
  wakeUp: () => void;
  feed: () => void;

  deleteEvent: (id: number) => void;

  updateProfile: (data: Partial<BabyProfile>) => void;
}

function buildStateFromEvents(
  events: BabyEvent[],
  now: number
): Pick<
  BabyState,
  | "status"
  | "sleepStartedAt"
  | "awakeStartedAt"
  | "sleepSessions"
  | "awakeSessions"
> {
  const { sleepSessions, awakeSessions } = rebuildSessions(events, now);

  const openSleep = sleepSessions.find(
    (session) => session.endedAt === null
  );

  if (openSleep) {
    return {
      status: "sleeping",
      sleepStartedAt: openSleep.startedAt,
      awakeStartedAt: null,
      sleepSessions,
      awakeSessions,
    };
  }

  const openAwake = awakeSessions.find(
    (session) => session.endedAt === null
  );

  return {
    status: "awake",
    sleepStartedAt: null,
    awakeStartedAt: openAwake?.startedAt ?? now,
    sleepSessions,
    awakeSessions,
  };
}

export const useBabyStore = create<BabyState>()(
  persist(
    (set) => ({
      status: "awake",

      sleepStartedAt: null,
      awakeStartedAt: Date.now(),

      lastFeedAt: null,

      profile: {
        name: "",
        birthDate: "",
        gender: null,
      },

      events: [],

      sleepSessions: [],

      awakeSessions: [],

      startSleep: () => {
        const now = Date.now();

        set((state) => {
          const events: BabyEvent[] = [
            {
              id: now,
              type: "sleep",
              title: "Уснул",
              timestamp: now,
            },
            ...state.events,
          ];

          return {
            events,
            ...buildStateFromEvents(events, now),
          };
        });
      },
            wakeUp: () => {
        const now = Date.now();

        set((state) => {
          const events: BabyEvent[] = [
            {
              id: now,
              type: "wake",
              title: "Проснулся",
              timestamp: now,
            },
            ...state.events,
          ];

          return {
            events,
            ...buildStateFromEvents(events, now),
          };
        });
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

      deleteEvent: (id: number) => {
        set((state) => {
          const now = Date.now();

          const events = state.events.filter(
            (event) => event.id !== id
          );

          return {
            events,
            ...buildStateFromEvents(events, now),
          };
        });
      },

      updateProfile: (data) => {
        set((state) => ({
          profile: {
            ...state.profile,
            ...data,
          },
        }));
      },
    }),
    {
      name: "sleepfeed",

      partialize: (state) => ({
        status: state.status,

        sleepStartedAt: state.sleepStartedAt,
        awakeStartedAt: state.awakeStartedAt,

        lastFeedAt: state.lastFeedAt,

        profile: state.profile,

        events: state.events,

        sleepSessions: state.sleepSessions,
        awakeSessions: state.awakeSessions,
      }),
    }
  )
);