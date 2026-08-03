import { useState } from "react";
import { Baby, Moon, Sun } from "lucide-react";

import useTodayStats from "../shared/hooks/useTodayStats";
import { formatDuration } from "../shared/lib/time";

import type { EventType } from "../shared/types/events";

import AddEditEventModal from "./AddEditEventModal";
import TodayStatRow, {
  type TodayStatType,
} from "./TodayStatRow";


export default function TodayStatsCard() {
  const {
    todaySleep,
    todayAwake,
    todayFeeds,
    todayFormulaAmount,
    todayBreastFeeds,
    todayFormulaFeeds,
  } = useTodayStats();


  const [modalOpen, setModalOpen] =
    useState(false);

  const [initialType, setInitialType] =
    useState<EventType>("feed");



  function openAddModal(
  type: TodayStatType,
) {
  const eventType =
    type === "awake"
      ? "wake"
      : type;

  setInitialType(eventType);

  setModalOpen(true);
}



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
            onAdd={openAddModal}
            onEdit={() => {}}
          />



          <TodayStatRow
            type="awake"
            icon={Sun}
            iconColor="text-amber-500"
            label="Бодрствование"
            value={formatDuration(todayAwake)}
            editTitle="Редактировать бодрствование"
            addTitle="Добавить бодрствование"
            onAdd={openAddModal}
            onEdit={() => {}}
          />



          <div>

            <TodayStatRow
              type="feed"
              icon={Baby}
              iconColor="text-emerald-500"
              label="Кормлений"
              value={todayFeeds}
              editTitle="Редактировать кормление"
              addTitle="Добавить кормление"
              onAdd={openAddModal}
              onEdit={() => {}}
            />


            {(todayFormulaAmount > 0 ||
              todayBreastFeeds > 0) && (

              <div className="ml-12 mt-3 overflow-hidden rounded-2xl bg-slate-50">

                {todayFormulaAmount > 0 && (
                  <div className="flex justify-between px-4 py-3">
                    <span className="font-medium text-slate-700">
                      🍼 Смесь
                    </span>

                    <span className="text-sm font-semibold text-slate-600">
                      {todayFormulaAmount} мл · {todayFormulaFeeds}
                    </span>
                  </div>
                )}


                {todayBreastFeeds > 0 && (
                  <div className="border-t border-slate-200 px-4 py-3">
                    <span className="font-medium text-slate-700">
                      🤱 Грудное · {todayBreastFeeds}
                    </span>
                  </div>
                )}

              </div>

            )}

          </div>


        </div>

      </section>



      <AddEditEventModal
        isOpen={modalOpen}
        initialType={initialType}
        onClose={() => setModalOpen(false)}
      />

    </>
  );
}