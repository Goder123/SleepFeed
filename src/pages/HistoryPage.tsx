import { useState } from "react";

import Header from "../shared/ui/Header";
import { useBabyStore } from "../store/babyStore";

import HistoryEventCard from "../widgets/HistoryEventCard";
import AddEventButton from "../widgets/AddEventButton";
import AddEditEventModal from "../widgets/AddEditEventModal";

export default function HistoryPage() {
  const events = useBabyStore((state) => state.events);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedEvents = [...events].sort(
    (a, b) => b.timestamp - a.timestamp
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
             console.log("Кнопка нажата");
                setIsModalOpen(true);
            }}
        />

        {sortedEvents.length === 0 ? (
          <div className="rounded-[24px] border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-slate-400">
              Пока нет событий
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedEvents.map((event) => (
              <HistoryEventCard
                key={event.id}
                event={event}
              />
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