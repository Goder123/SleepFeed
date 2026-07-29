export type EventType = "sleep" | "wake" | "feed";

export interface BabyEvent {
  id: number;
  type: EventType;
  title: string;
  timestamp: number;
}