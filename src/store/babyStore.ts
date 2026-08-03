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
  addEvent: (event: BabyEvent) => void;

  deleteEvent: (id: number) => void;
  updateEvent: (event: BabyEvent) => void;

  updateProfile: (data: Partial<BabyProfile>) => void;
}

function buildStateFromEvents(
  events: BabyEvent[],
): Pick<
  BabyState,
  | "status"
  | "sleepStartedAt"
  | "awakeStartedAt"
  | "sleepSessions"
  | "awakeSessions"
> {
  const { sleepSessions, awakeSessions } = rebuildSessions(events);

  const openSleep = sleepSessions.find((session) => session.endedAt === null);
  const openAwake = awakeSessions.find((session) => session.endedAt === null);

  if (openSleep) {
    return {
      status: "sleeping",
      sleepStartedAt: openSleep.startedAt,
      awakeStartedAt: null,
      sleepSessions,
      awakeSessions,
    };
  }

  if (openAwake) {
    return {
      status: "wake",
      sleepStartedAt: null,
      awakeStartedAt: openAwake.startedAt,
      sleepSessions,
      awakeSessions,
    };
  }

  return {
    status: "idle",
    sleepStartedAt: null,
    awakeStartedAt: null,
    sleepSessions,
    awakeSessions,
  };
}
function createEvent(
  type: BabyEvent["type"],
  title: string,
  timestamp: number,
): BabyEvent {
  return {
    id: timestamp,
    type,
    title,
    timestamp,
  };
}

export const useBabyStore = create<BabyState>()(
  persist(
    (set) => ({
      status: "idle",

      sleepStartedAt: null,
      awakeStartedAt: null,

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
          if (state.status === "sleeping") {
            return state;
          }

          const events = [createEvent("sleep", "Уснул", now), ...state.events];

          return {
            events,
            ...buildStateFromEvents(events),
          };
        });
      },

      wakeUp: () => {
        const now = Date.now();

        set((state) => {
          if (state.status === "wake") {
            return state;
          }

          const events = [
            createEvent("wake", "Проснулся", now),
            ...state.events,
          ];

          return {
            events,
            ...buildStateFromEvents(events),
          };
        });
      },

      feed: () => {
        const now = Date.now();

        set((state) => ({
          lastFeedAt: now,
          events: [createEvent("feed", "Покормил", now), ...state.events],
        }));
      },
      addEvent: (event: BabyEvent) => {
        set((state) => {
          const events = [event, ...state.events].sort(
            (a, b) => b.timestamp - a.timestamp,
          );

          return {
            events,
            lastFeedAt:
              event.type === "feed" ? event.timestamp : state.lastFeedAt,
            ...buildStateFromEvents(events),
          };
        });
      },

      deleteEvent: (id: number) => {
        set((state) => {
          const events = state.events.filter((event) => event.id !== id);

          return {
            events,
            ...buildStateFromEvents(events),
          };
        });
      },

      updateEvent: (updatedEvent: BabyEvent) => {
        set((state) => {
          const events = state.events
            .map((event) =>
              event.id === updatedEvent.id ? updatedEvent : event,
            )
            .sort((a, b) => b.timestamp - a.timestamp);

          return {
            events,
            ...buildStateFromEvents(events),
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
    },
  ),
);
