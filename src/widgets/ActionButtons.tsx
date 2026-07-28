import ActionCard from "../shared/ui/ActionCard";
import { Moon, Sun, Baby } from "lucide-react";
import { useBabyStore } from "../store/babyStore";

export default function ActionButtons() {
  const startSleep = useBabyStore((state) => state.startSleep);
  const wakeUp = useBabyStore((state) => state.wakeUp);
  const feed = useBabyStore((state) => state.feed);

  return (
    <section className="space-y-5 mt-8">
      <ActionCard
        icon={<Moon size={46} strokeWidth={2.5} />}
        title="Уснул"
        color="bg-gradient-to-r from-indigo-600 to-violet-500 text-white"
        onClick={startSleep}
      />

      <ActionCard
        icon={<Sun size={46} strokeWidth={2.5} />}
        title="Проснулся"
        color="bg-gradient-to-r from-amber-400 to-orange-500 text-black"
        onClick={wakeUp}
      />

      <ActionCard
        icon={<Baby size={46} strokeWidth={2.5} />}
        title="Покормил"
        color="bg-gradient-to-r from-emerald-500 to-teal-500 text-black"
        onClick={feed}
      />
    </section>
  );
}