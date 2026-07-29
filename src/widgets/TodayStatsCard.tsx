import { Baby, Moon, Sun } from "lucide-react";

import useTodayStats from "../shared/hooks/useTodayStats";
import { formatDuration } from "../shared/lib/time";

export default function TodayStatsCard() {
  const { todaySleep, todayAwake, todayFeeds } = useTodayStats();

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