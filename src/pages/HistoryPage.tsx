import { useState } from "react";

import Header from "../shared/ui/Header";
import { buildTimeline } from "../shared/lib/timeline";
import { useBabyStore } from "../store/babyStore";

import TimelineItemCard from "../widgets/TimelineItemCard";
import AddEventButton from "../widgets/AddEventButton";
import AddEditEventModal from "../widgets/AddEditEventModal";

export default function HistoryPage() {
  console.log("HistoryPage rendered");

  const events = useBabyStore((state) => state.events);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const timeline = buildTimeline(events);
  console.log("EVENTS", events);
console.log("TIMELINE", timeline);

  const hasItems = timeline.some(
    (day) => day.items.length > 0
  );

  return (
    <>
      <Header
        title="История"
        showBackButton
      />

      <main className="mx-auto flex min-h-screen max-w-[430px] flex-col gap-4 bg-slate-950 px-5 pb-6">
        <h2 className="mt-2 text-2xl font-bold text-white">
          История событий
        </h2>

        <AddEventButton
          onClick={() => {
            setIsModalOpen(true);
          }}
        />

        {!hasItems ? (
          <div className="rounded-[24px] border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-slate-400">
              Пока нет событий
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {timeline.map((day) => (
              <section
                key={day.date}
                className="space-y-3"
              >
                <h3 className="px-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  {day.date}
                </h3>

                {day.items.map((item) => (
                  <TimelineItemCard
                    key={item.id}
                    item={item}
                  />
                ))}
              </section>
            ))}
          </div>
        )}
      </main>

      <AddEditEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}