import { useBabyStore } from "../../store/babyStore";
import useNow from "./useNow";
import { formatClock, formatDuration } from "../lib/time";

export default function useStatusCard() {
  const status = useBabyStore((state) => state.status);
  const sleepStartedAt = useBabyStore((state) => state.sleepStartedAt);
  const awakeStartedAt = useBabyStore((state) => state.awakeStartedAt);

  const now = useNow();

  const sleeping = status === "sleeping";
  const idle = status === "idle";

  const startedAt = sleeping ? sleepStartedAt : awakeStartedAt;

  const duration =
    startedAt != null
      ? formatDuration(Math.max(0, now - startedAt))
      : "00:00:00";

  return {
    status,
    sleeping,
    idle,
    duration,
    startedAt,
    startedAtLabel: startedAt
      ? `С ${formatClock(startedAt)}`
      : "",
  };
}