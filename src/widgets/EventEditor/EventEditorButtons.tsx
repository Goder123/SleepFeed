interface EventEditorButtonsProps {
  isEditing: boolean;
  onSave: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
}

export default function EventEditorButtons({
  isEditing,
  onSave,
  onDelete,
  onCancel,
}: EventEditorButtonsProps) {
  return (
    <div className="space-y-3 pt-2">
      <button
        type="button"
        onClick={onSave}
        className="
          w-full
          rounded-2xl
          bg-indigo-600
          py-4
          font-semibold
          text-white
          transition
          hover:bg-indigo-500
        "
      >
        {isEditing ? "Сохранить" : "Добавить"}
      </button>

      {isEditing && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="
            w-full
            rounded-2xl
            border
            border-red-500
            py-4
            font-semibold
            text-red-400
          "
        >
          Удалить
        </button>
      )}

      <button
        type="button"
        onClick={onCancel}
        className="
          w-full
          rounded-2xl
          bg-slate-800
          py-4
          font-semibold
          text-white
        "
      >
        Отмена
      </button>
    </div>
  );
}