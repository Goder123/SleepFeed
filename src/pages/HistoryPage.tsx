import { useState } from "react";

import Header from "../shared/ui/Header";

import { buildTimeline } from "../shared/lib/timeline";
import { filterTimeline } from "../shared/lib/filterTimeline";
import { findEventsForTimelineItem } from "../shared/lib/findEventsForTimelineItem";

import type {
  TimelineFilter,
  TimelineItem,
} from "../shared/types/events";

import type {
  EditingItem,
} from "../shared/types/editing";


import { useBabyStore } from "../store/babyStore";

import TimelineItemCard from "../widgets/TimelineItemCard";
import AddEventButton from "../widgets/AddEventButton";
import AddEditEventModal from "../widgets/AddEditEventModal";


export default function HistoryPage() {

  const events = useBabyStore(
    (state) => state.events,
  );

  const sleepSessions = useBabyStore(
    (state) => state.sleepSessions,
  );

  const awakeSessions = useBabyStore(
    (state) => state.awakeSessions,
  );


  const [isModalOpen, setIsModalOpen] =
    useState(false);


  const [selectedItem, setSelectedItem] =
    useState<EditingItem>();


  const [filter, setFilter] =
    useState<TimelineFilter>("all");


  const timeline = buildTimeline(
    events,
    sleepSessions,
    awakeSessions,
  );


  const filteredTimeline =
    filterTimeline(
      timeline,
      filter,
    );


  const hasItems =
    filteredTimeline.some(
      (day) =>
        day.items.length > 0,
    );


  function handleAddEvent() {

    setSelectedItem(undefined);

    setIsModalOpen(true);
  }



  function handleItemClick(
    item: TimelineItem,
  ) {

    const result =
      findEventsForTimelineItem(
        item,
        events,
      );


    if (!result) {
      return;
    }


    setSelectedItem(result);

    setIsModalOpen(true);
  }



  function handleCloseModal() {

    setIsModalOpen(false);

    setSelectedItem(undefined);
  }



  return (
    <>
      <main
        className="
          mx-auto
          min-h-screen
          max-w-[430px]
          bg-slate-950
          text-white
        "
      >

        <Header
          title="История"
          showBackButton
        />


        <div
          className="
            flex
            flex-col
            gap-4
            px-5
            pb-6
          "
        >

          <h2
            className="
              mt-2
              text-2xl
              font-bold
            "
          >
            История событий
          </h2>



          <AddEventButton
            onClick={handleAddEvent}
          />



          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            {[
              ["all", "Все"],
              ["sleep", "Сон"],
              ["awake", "Бодрствование"],
              ["feed", "Кормления"],
            ].map(
              ([value, label]) => (

              <button
                key={value}
                type="button"
                onClick={() =>
                  setFilter(
                    value as TimelineFilter,
                  )
                }
                className={
                  filter === value
                    ? `
                      rounded-full
                      bg-indigo-600
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-white
                    `
                    : `
                      rounded-full
                      bg-slate-800
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-slate-300
                    `
                }
              >
                {label}
              </button>

            ))}
          </div>




          {!hasItems ? (

            <div
              className="
                rounded-[24px]
                border
                border-slate-800
                bg-slate-900
                p-8
                text-center
              "
            >
              <p
                className="
                  text-slate-400
                "
              >
                Пока нет событий
              </p>
            </div>


          ) : (

            <div
              className="
                space-y-6
              "
            >

              {filteredTimeline.map(
                (day) => (

                <section
                  key={day.date}
                  className="space-y-3"
                >

                  <h3
                    className="
                      px-1
                      text-sm
                      font-semibold
                      uppercase
                      tracking-wide
                      text-slate-400
                    "
                  >
                    {day.date}
                  </h3>



                  {day.items.map(
                    (item) => (

                    <TimelineItemCard
                      key={item.id}
                      item={item}
                      onClick={() =>
                        handleItemClick(
                          item,
                        )
                      }
                    />

                  ))}


                </section>

              ))}

            </div>

          )}


        </div>


      </main>



      <AddEditEventModal
        isOpen={isModalOpen}
        editingItem={selectedItem}
        onClose={handleCloseModal}
      />

    </>
  );
}