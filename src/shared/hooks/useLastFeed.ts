import { useBabyStore } from "../../store/babyStore";
import { formatClock } from "../lib/time";

export default function useLastFeed() {
  const events = useBabyStore(
    (state) => state.events,
  );

  const lastFeed = events.find(
    (event) => event.type === "feed",
  );


  return {
    lastFeedAt: lastFeed?.timestamp ?? null,

    lastFeedTime: lastFeed
      ? formatClock(lastFeed.timestamp)
      : "--:--",


    lastFeedLabel: lastFeed
      ? lastFeed.feedingType === "formula"
        ? `🍼 Смесь${lastFeed.amount ? ` ${lastFeed.amount} мл` : ""}`
        : lastFeed.feedingType === "breast"
          ? "🤱 Грудное"
          : "Кормление"
      : "Кормлений пока нет",
  };
}