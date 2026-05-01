// ** Sections
import Welcome from "./sections/Welcome";
import Cards from "./sections/Cards";
import Logs from "./sections/Logs";
import Tips from "./sections/Tips";
import Sessions from "./sections/Sessions";
import Tracker from "./sections/Tracker";
// ** Interfaces
interface HomeProps{
  members: number;
  active: number;
  expired: number;
  presentNow: number;
  expiringSoon: number;
  recentLogs: any[];
}



export default function Home({ members, active, expired, presentNow, expiringSoon, recentLogs }:HomeProps) {
  return (
    <main className="flex flex-col gap-6 lg:gap-8">
      <Welcome />
      <Cards members={members} active={active} expired={expired} presentNow={presentNow} expiringSoon={expiringSoon} />
      <section className="grid gap-6 xl:grid-cols-3 xl:gap-8">
        <Logs data={recentLogs} />
        <Tips />
      </section>
      <section className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Sessions />
        <Tracker />
      </section>
    </main>
  );
}
