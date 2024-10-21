import GeographicPreferencePieChart from "@/components/GeographicPreferencePieChart/GeographicPreferencePieChart";
import GraduateTypePieChart from "@/components/GraduateTypePieChart/GraduateTypePieChart";
import MostRecentInvites from "@/components/MostRecentInvites/MostRecentInvites";
import MostInvites from "@/components/MostInvites/MostInvites";
import ProgramCompetitiveness from "@/components/ProgramCompetitivenessChart/ProgramCompetitiveness";
import SignalsOverTimeChart from "@/components/SignalsOverTimeChart/SignalsOverTimeChart";
import SpotsLeft from "@/components/SpotsLeft/SpotsLeft";
import TimeRangeChart from "@/components/TimeRangeChart/TimeRangeChart";
import TopUsers from "@/components/TopUsers/TopUsers";

const Analytics = () => {
  return (
    <div>
      <div className={`grid sm:grid-cols-2 gap-4`}>
        <div className={`sm:col-span-2`}>
          <TimeRangeChart />
        </div>

        <MostRecentInvites />

        <SpotsLeft />

        <SignalsOverTimeChart />
        <ProgramCompetitiveness />
        <GraduateTypePieChart />
        <GeographicPreferencePieChart />
        <MostInvites />
        <TopUsers />
      </div>
    </div>
  );
};

export default Analytics;
