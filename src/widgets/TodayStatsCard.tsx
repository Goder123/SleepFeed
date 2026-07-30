import { Baby, Moon, Sun } from "lucide-react";

import useTodayStats from "../shared/hooks/useTodayStats";
import { formatDuration } from "../shared/lib/time";

import TodayStatRow, { type TodayStatType } from "./TodayStatRow";

export default function TodayStatsCard() {
  const { todaySleep, todayAwake, todayFeeds } = useTodayStats();

  const handleEdit = (type: TodayStatType) => {
    console.log("Редактировать:", type);
  };

  const handleAdd = (type: TodayStatType) => {
    console.log("Добавить:", type);
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        📊 Сегодня
      </h2>

      <div className="space-y-4">
        <TodayStatRow
          type="sleep"
          icon={Moon}
          iconColor="text-indigo-500"
          label="Сон"
          value={formatDuration(todaySleep)}
          editTitle="Редактировать сон"
          addTitle="Добавить сон"
          onEdit={handleEdit}
          onAdd={handleAdd}
        />

        <TodayStatRow
          type="awake"
          icon={Sun}
          iconColor="text-amber-500"
          label="Бодрствование"
          value={formatDuration(todayAwake)}
          editTitle="Редактировать бодрствование"
          addTitle="Добавить бодрствование"
          onEdit={handleEdit}
          onAdd={handleAdd}
        />

        <TodayStatRow
          type="feed"
          icon={Baby}
          iconColor="text-emerald-500"
          label="Кормлений"
          value={todayFeeds}
          editTitle="Редактировать кормление"
          addTitle="Добавить кормление"
          onEdit={handleEdit}
          onAdd={handleAdd}
        />
      </div>
    </section>
  );
}