export type EventType = "sleep" | "wake" | "feed";

export interface BabyEvent {
  id: number;
  type: EventType;
  title: string;
  timestamp: number;
}

export type TimelineItemType =
  | "sleep"
  | "awake"
  | "feed";

export interface TimelineItem {
  id: number;

  type: TimelineItemType;

  title: string;

  start: number;

  end?: number;

  duration?: number;
}

export interface TimelineDay {
  date: string;

  items: TimelineItem[];
}