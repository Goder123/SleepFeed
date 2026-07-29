import StatusCard from "../widgets/StatusCard";
import ActionButtons from "../widgets/ActionButtons";
import LastFeedCard from "../widgets/LastFeedCard";
import TodayStatsCard from "../widgets/TodayStatsCard";
import Timeline from "../widgets/Timeline";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-5 max-w-[430px] mx-auto space-y-4">
      <StatusCard />

      <ActionButtons />

      <LastFeedCard />

      <TodayStatsCard />

      <Timeline />
    </main>
  );
}