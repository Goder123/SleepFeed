import { useBabyStore } from "../../store/babyStore";
import useNow from "./useNow";
import { formatClock, formatDuration } from "../lib/time";

export default function useStatusCard() {
  const status = useBabyStore((state) => state.status);
  const sleepStartedAt = useBabyStore((state) => state.sleepStartedAt);
  const awakeStartedAt = useBabyStore((state) => state.awakeStartedAt);

  const now = useNow();

  const sleeping = status === "sleeping";

  const startedAt = sleeping ? sleepStartedAt : awakeStartedAt;

  const duration =
    startedAt !== null
      ? formatDuration(now - startedAt)
      : "00:00:00";

  return {
    sleeping,
    duration,
    startedAt,
    startedAtLabel: startedAt
      ? `С ${formatClock(startedAt)}`
      : "—",
  };
}