import { useBabyStore } from "../../store/babyStore";
import useNow from "./useNow";
import {
  calculateTodayAwake,
  calculateTodayFeeds,
  calculateTodaySleep,
} from "../lib/statistics";

export default function useTodayStats() {
  const now = useNow();

  const sleepSessions = useBabyStore((state) => state.sleepSessions);
  const awakeSessions = useBabyStore((state) => state.awakeSessions);
  const events = useBabyStore((state) => state.events);

  const todaySleep = calculateTodaySleep(sleepSessions, now);

  const todayAwake = calculateTodayAwake(awakeSessions, now);

  const todayFeeds = calculateTodayFeeds(
    events.filter((event) => event.type === "feed").length
  );

  return {
    todaySleep,
    todayAwake,
    todayFeeds,
  };
}