import { useEffect } from "react";
import { X } from "lucide-react";

import { useBabyStore } from "../store/babyStore";

import type { EditingItem } from "../shared/types/editing";
import type { BabyEvent, EventType } from "../shared/types/events";

import EventEditor from "./EventEditor/EventEditor";

interface AddEditEventModalProps {
  isOpen: boolean;
  editingItem?: EditingItem;
  initialType?: EventType;
  onClose: () => void;
}

const HEADER_HEIGHT = 64;

export default function AddEditEventModal({
  isOpen,
  editingItem,
  initialType,
  onClose,
}: AddEditEventModalProps) {
  const addEvent = useBabyStore((state) => state.addEvent);

  const updateEvent = useBabyStore((state) => state.updateEvent);

  const deleteEvent = useBabyStore((state) => state.deleteEvent);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  function handleSubmit(events: BabyEvent[]) {
    events.forEach((event) => {
      const exists =
        editingItem &&
        (editingItem.type === "feed"
          ? editingItem.event.id === event.id
          : editingItem.type === "sleep"
            ? editingItem.sleepEvent.id === event.id ||
              editingItem.wakeEvent?.id === event.id
            : editingItem.wakeEvent.id === event.id);

      if (exists) {
        updateEvent(event);
      } else {
        addEvent(event);
      }
    });

    onClose();
  }

  function handleDelete() {
    if (!editingItem) {
      return;
    }

    if (editingItem.type === "feed") {
      deleteEvent(editingItem.event.id);
    }

    if (editingItem.type === "sleep") {
      deleteEvent(editingItem.sleepEvent.id);

      if (editingItem.wakeEvent) {
        deleteEvent(editingItem.wakeEvent.id);
      }
    }

    if (editingItem.type === "awake") {
      deleteEvent(editingItem.wakeEvent.id);
    }

    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="absolute inset-x-0 flex justify-center px-4"
        style={{
          top: HEADER_HEIGHT,
        }}
      >
        <div
          className="
            animate-modal
            mx-4
            w-full
            max-w-[420px]
            overflow-hidden
            rounded-t-[36px]
            bg-[#161E33]
            shadow-[0_-20px_60px_rgba(0,0,0,.45)]
            ring-1
            ring-slate-700/40
          "
          style={{
            maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          <div className="flex justify-center pt-1">
            <div className="h-1.5 w-12 rounded-full bg-slate-600" />
          </div>

          <div className="flex items-center justify-between px-6 pb-4 pt-1">
            <div>
              <h2 className="text-[32px] font-bold tracking-tight text-white">
                {editingItem ? "Редактировать событие" : "Добавить событие"}
              </h2>

              <p className="mt-1 text-[15px] text-slate-400">
                Заполните данные события
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-slate-800/60
                text-slate-400
                transition
                hover:bg-slate-700
                hover:text-white
              "
            >
              <X size={22} />
            </button>
          </div>

          <div
            className="
              max-h-[calc(100vh-210px)]
              overflow-y-auto
              px-6
              pb-8
              scrollbar-thin
              scrollbar-thumb-slate-700
              scrollbar-track-transparent
            "
          >
            <EventEditor
              editingItem={editingItem}
              initialType={initialType}
              onSubmit={handleSubmit}
              onDelete={editingItem ? handleDelete : undefined}
              onCancel={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
