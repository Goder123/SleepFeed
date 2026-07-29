import { useBabyStore } from "../../store/babyStore";
import { formatClock } from "../lib/time";

export default function useLastFeed() {
  const lastFeedAt = useBabyStore((state) => state.lastFeedAt);

  return {
    lastFeedAt,
    lastFeedTime: lastFeedAt ? formatClock(lastFeedAt) : "--:--",
    lastFeedLabel: lastFeedAt ? "Сегодня" : "Кормлений пока нет",
  };
}