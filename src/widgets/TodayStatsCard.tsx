import { useState } from "react";
import { Baby, Moon, Sun } from "lucide-react";

import useTodayStats from "../shared/hooks/useTodayStats";
import { formatDuration } from "../shared/lib/time";

import EventEditorModal, {
  type EventEditorMode,
  type EventEditorType,
} from "./EventEditorModal";
import TodayStatRow, { type TodayStatType } from "./TodayStatRow";

export default function TodayStatsCard() {
  const { todaySleep, todayAwake, todayFeeds } = useTodayStats();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] =
    useState<EventEditorMode>("add");
  const [modalType, setModalType] =
    useState<EventEditorType>("sleep");

  const openModal = (
    mode: EventEditorMode,
    type: TodayStatType,
  ) => {
    setModalMode(mode);
    setModalType(type);
    setModalOpen(true);
  };

  const handleEdit = (type: TodayStatType) => {
    openModal("edit", type);
  };

  const handleAdd = (type: TodayStatType) => {
    openModal("add", type);
  };

  return (
    <>
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

      <EventEditorModal
        open={modalOpen}
        mode={modalMode}
        type={modalType}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}