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
  gymName?: string;
  ownerName?: string;
  membersExpiringSoon?: any[];
  recentLogs: any[];
}



export default function Home({ 
  members, 
  active, 
  expired, 
  presentNow, 
  expiringSoon, 
  gymName, 
  ownerName, 
  membersExpiringSoon = [], 
  recentLogs = [] 
}:HomeProps) {
  return (
    <main className="flex flex-col gap-6 lg:gap-8">
      <Welcome ownerName={ownerName} gymName={gymName} expiringSoon={expiringSoon} />
      <Cards members={members} active={active} expired={expired} presentNow={presentNow} expiringSoon={expiringSoon} />
      <section className="grid gap-6 xl:grid-cols-3 xl:gap-8">
        <div className="xl:col-span-2">
            <Logs data={recentLogs} />
        </div>
        <div className="xl:col-span-1">
            <Tips />
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Sessions data={membersExpiringSoon} />
        <Tracker presentNow={presentNow} />
      </section>
    </main>
  );
}
