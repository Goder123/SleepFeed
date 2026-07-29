import { Moon, Sun, Baby } from "lucide-react";

import useNow from "../shared/hooks/useNow";
import { useBabyStore } from "../store/babyStore";
import { formatDuration } from "../shared/lib/time";
import {
  calculateTodaySleep,
  calculateTodayAwake,
  calculateTodayFeeds,
} from "../shared/lib/statistics";

export default function TodayStatsCard() {
  const now = useNow();

  const sleepSessions = useBabyStore((state) => state.sleepSessions);
  const awakeSessions = useBabyStore((state) => state.awakeSessions);
  const events = useBabyStore((state) => state.events);

  const todaySleep = calculateTodaySleep(sleepSessions, now);

  const todayAwake = calculateTodayAwake(awakeSessions, now);

  const todayFeeds = calculateTodayFeeds(
    events.filter((event) => event.type === "feed").length
  );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        📊 Сегодня
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <Moon className="text-indigo-500" size={22} />
            <span className="font-medium text-slate-900">
              Сон
            </span>
          </div>

          <span className="font-mono text-lg font-bold text-slate-900">
            {formatDuration(todaySleep)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <Sun className="text-amber-500" size={22} />
            <span className="font-medium text-slate-900">
              Бодрствование
            </span>
          </div>

          <span className="font-mono text-lg font-bold text-slate-900">
            {formatDuration(todayAwake)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <Baby className="text-emerald-500" size={22} />
            <span className="font-medium text-slate-900">
              Кормлений
            </span>
          </div>

          <span className="text-lg font-bold text-slate-900">
            {todayFeeds}
          </span>
        </div>
      </div>
    </section>
  );
}