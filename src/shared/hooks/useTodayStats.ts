import { useBabyStore } from "../../store/babyStore";
import useNow from "./useNow";

import {
  calculateTodayAwake,
  calculateTodaySleep,
} from "../lib/statistics";


export default function useTodayStats() {
  const now = useNow();

  const sleepSessions = useBabyStore(
    (state) => state.sleepSessions,
  );

  const awakeSessions = useBabyStore(
    (state) => state.awakeSessions,
  );

  const events = useBabyStore(
    (state) => state.events,
  );


  const todaySleep =
    calculateTodaySleep(
      sleepSessions,
      now,
    );


  const todayAwake =
    calculateTodayAwake(
      awakeSessions,
      now,
    );


  const todayFeedEvents =
    events.filter(
      (event) =>
        event.type === "feed" &&
        new Date(event.timestamp)
          .toDateString() ===
          new Date(now)
            .toDateString(),
    );


  const todayFeeds =
    todayFeedEvents.length;


  const todayFormulaFeeds =
    todayFeedEvents.filter(
      (event) =>
        event.feedingType === "formula",
    ).length;


  const todayBreastFeeds =
    todayFeedEvents.filter(
      (event) =>
        event.feedingType === "breast",
    ).length;


  const todayFormulaAmount =
    todayFeedEvents.reduce(
      (total, event) => {
        if (
          event.feedingType === "formula"
        ) {
          return total + (event.amount ?? 0);
        }

        return total;
      },
      0,
    );


  return {
    todaySleep,

    todayAwake,

    todayFeeds,

    todayFormulaFeeds,

    todayBreastFeeds,

    todayFormulaAmount,
  };
}