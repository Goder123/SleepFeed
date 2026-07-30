import { Plus } from "lucide-react";

interface AddEventButtonProps {
  onClick: () => void;
}

export default function AddEventButton({
  onClick,
}: AddEventButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-center gap-3 rounded-[28px] border border-dashed border-sky-500/40 bg-sky-500/10 p-5 transition-all duration-200 hover:bg-sky-500/15 active:scale-[0.98]"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500/20">
        <Plus
          size={22}
          className="text-sky-400 transition-transform duration-200 group-hover:rotate-90"
        />
      </div>

      <div className="text-left">
        <h2 className="font-semibold text-white">
          Добавить событие
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Добавьте сон, бодрствование или кормление
        </p>
      </div>
    </button>
  );
}