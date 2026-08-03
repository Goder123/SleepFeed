export type EventType =
  | "sleep"
  | "wake"
  | "feed";


export type FeedingType =
  | "breast"
  | "formula";


export interface BabyEvent {
  id: number;

  type: EventType;

  title: string;

  timestamp: number;


  /**
   * Тип кормления.
   * Только для событий feed.
   */
  feedingType?: FeedingType;


  /**
   * Количество смеси в мл.
   * Только для formula.
   */
  amount?: number;
}



export type TimelineItemType =
  | "sleep"
  | "awake"
  | "feed";


export type TimelineFilter =
  | "all"
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


  /**
   * Для кормления.
   */
  sourceEvent?: BabyEvent;


  /**
   * Для сна.
   * ID события "Уснул".
   */
  sleepEventId?: number;


  /**
   * Для сна.
   * ID события "Проснулся".
   */
  wakeEventId?: number;


  /**
   * Для бодрствования.
   * ID события "Проснулся".
   */
  awakeEventId?: number;


  /**
   * Для бодрствования.
   * ID события "Уснул".
   */
  nextSleepEventId?: number;
}



export interface TimelineDay {
  date: string;

  items: TimelineItem[];
}