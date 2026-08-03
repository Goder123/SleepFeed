import { useEffect, useState } from "react";
import EventEditorFeed from "./EventEditorFeed";
import type {
  BabyEvent,
  EventType,
  FeedingType,
} from "../../shared/types/events";
import EventEditorButtons from "./EventEditorButtons";
import type { EditingItem } from "../../shared/types/editing";
import EventEditorSleep from "./EventEditorSleep";

import EventTypeSelector from "../EventTypeSelector";
import EventEditorAwake from "./EventEditorAwake";

interface EventEditorProps {
  editingItem?: EditingItem;

  initialType?: EventType;

  onSubmit: (events: BabyEvent[]) => void;

  onDelete?: () => void;

  onCancel?: () => void;
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toISOString().slice(0, 10);
}

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EventEditor({
  editingItem,
  initialType,
  onSubmit,
  onDelete,
  onCancel,
}: EventEditorProps) {
  const initialEvent =
    editingItem?.type === "feed"
      ? editingItem.event
      : editingItem?.type === "sleep"
        ? editingItem.sleepEvent
        : editingItem?.type === "awake"
          ? editingItem.wakeEvent
          : undefined;

  const [type, setType] = useState<EventType>(
    initialEvent?.type ?? initialType ?? "feed",
  );

  const [date, setDate] = useState(
    formatDate(initialEvent?.timestamp ?? Date.now()),
  );

  const [time, setTime] = useState(
    formatTime(initialEvent?.timestamp ?? Date.now()),
  );

  /*
    Новые поля кормления
  */

  const [feedingType, setFeedingType] = useState<FeedingType>(
    initialEvent?.feedingType ?? "formula",
  );

  const [amount, setAmount] = useState(
    initialEvent?.amount ? String(initialEvent.amount) : "",
  );

  /*
    Конец сна
  */

  const [endDate, setEndDate] = useState(
    editingItem?.type !== "feed" && editingItem?.wakeEvent
      ? formatDate(editingItem.wakeEvent.timestamp)
      : "",
  );

  const [endTime, setEndTime] = useState(
    editingItem?.type !== "feed" && editingItem?.wakeEvent
      ? formatTime(editingItem.wakeEvent.timestamp)
      : "",
  );

  useEffect(() => {
    if (!editingItem) {
      return;
    }

    if (editingItem.type === "feed") {
      setType("feed");

      setDate(formatDate(editingItem.event.timestamp));

      setTime(formatTime(editingItem.event.timestamp));

      setFeedingType(editingItem.event.feedingType ?? "formula");

      setAmount(
        editingItem.event.amount ? String(editingItem.event.amount) : "",
      );
    }

    if (editingItem.type === "sleep") {
      setType("sleep");

      setDate(formatDate(editingItem.sleepEvent.timestamp));

      setTime(formatTime(editingItem.sleepEvent.timestamp));

      if (editingItem.wakeEvent) {
        setEndDate(formatDate(editingItem.wakeEvent.timestamp));

        setEndTime(formatTime(editingItem.wakeEvent.timestamp));
      }
    }

    if (editingItem.type === "awake") {
      setType("wake");

      setDate(formatDate(editingItem.wakeEvent.timestamp));

      setTime(formatTime(editingItem.wakeEvent.timestamp));
    }
  }, [editingItem]);
  function handleSubmit() {
    const startTimestamp = new Date(`${date}T${time}`).getTime();

    /*
      КОРМЛЕНИЕ
    */

    if (type === "feed") {
      const event: BabyEvent = {
        id:
          editingItem?.type === "feed" ? editingItem.event.id : startTimestamp,

        type: "feed",

        title: "Покормил",

        timestamp: startTimestamp,

        feedingType,

        amount:
          feedingType === "formula" && amount ? Number(amount) : undefined,
      };

      onSubmit([event]);

      return;
    }

    /*
      СОН
    */

    if (type === "sleep") {
      const sleepEvent: BabyEvent = {
        id:
          editingItem?.type === "sleep"
            ? editingItem.sleepEvent.id
            : startTimestamp,

        type: "sleep",

        title: "Уснул",

        timestamp: startTimestamp,
      };

      const result: BabyEvent[] = [sleepEvent];

      if (endDate && endTime) {
        const endTimestamp = new Date(`${endDate}T${endTime}`).getTime();

        result.push({
          id:
            editingItem?.type === "sleep" && editingItem.wakeEvent
              ? editingItem.wakeEvent.id
              : endTimestamp,

          type: "wake",

          title: "Проснулся",

          timestamp: endTimestamp,
        });
      }

      onSubmit(result);

      return;
    }

    /*
      БОДРСТВОВАНИЕ
    */

    const wakeEvent: BabyEvent = {
      id:
        editingItem?.type === "awake"
          ? editingItem.wakeEvent.id
          : startTimestamp,

      type: "wake",

      title: "Проснулся",

      timestamp: startTimestamp,
    };

    onSubmit([wakeEvent]);
  }

  return (
    <div className="space-y-6">
      {!editingItem && (
        <EventTypeSelector selectedType={type} onSelect={setType} />
      )}

      {type === "feed" && (
        <EventEditorFeed
          feedingType={feedingType}
          amount={amount}
          date={date}
          time={time}
          onFeedingTypeChange={setFeedingType}
          onAmountChange={setAmount}
          onDateChange={setDate}
          onTimeChange={setTime}
        />
      )}

      {type === "sleep" && (
        <EventEditorSleep
          startDate={date}
          startTime={time}
          endDate={endDate}
          endTime={endTime}
          onStartDateChange={setDate}
          onStartTimeChange={setTime}
          onEndDateChange={setEndDate}
          onEndTimeChange={setEndTime}
        />
      )}

      {type === "wake" && (
        <EventEditorAwake
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
        />
      )}

      <EventEditorButtons
        isEditing={!!editingItem}
        onSave={handleSubmit}
        onDelete={editingItem ? onDelete : undefined}
        onCancel={onCancel}
      />
    </div>
  );
}
