import type {
  BabyEvent,
  TimelineItem,
} from "./events";

export type EditingItem =
  | FeedEditingItem
  | SleepEditingItem
  | AwakeEditingItem;

export interface FeedEditingItem {
  type: "feed";

  event: BabyEvent;
}

export interface SleepEditingItem {
  type: "sleep";

  sleepEvent: BabyEvent;

  wakeEvent?: BabyEvent;
}

export interface AwakeEditingItem {
  type: "awake";

  wakeEvent: BabyEvent;

  sleepEvent?: BabyEvent;
}

export interface TimelineSelection {
  timelineItem: TimelineItem;

  editingItem: EditingItem;
}