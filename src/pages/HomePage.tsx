import StatusCard from "../widgets/StatusCard";
import LastFeedCard from "../widgets/LastFeedCard";
import ActionButtons from "../widgets/ActionButtons";
import Timeline from "../widgets/Timeline";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-5 max-w-[430px] mx-auto">
      <StatusCard />
      <LastFeedCard />
      <ActionButtons />
      <Timeline />
    </main>
  );
}