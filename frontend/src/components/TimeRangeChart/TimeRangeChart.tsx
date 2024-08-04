import { ResponsiveBar } from "@nivo/bar";
import dayjs from "dayjs";
import "./style.css";
import inviteService from "@/services/inviteService";
import { useQuery } from "@tanstack/react-query";

const TimeRangeChart = () => {
  const {
    data: totalInvitesData,
    error: totalInvitesError,
    isLoading: isTotalInvitesLoading,
  } = useQuery({
    queryKey: ["total-invites-over-time"],
    queryFn: () => inviteService.getTotalInvitesOverTime(),
  });

  const processedData = totalInvitesData
    ?.map((d) => ({
      ...d,
      date: dayjs(d.date).format("YYYY-MM-DD"), // Format the date using dayjs
    }))
    .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()); // Sort by date

  return (
    <div style={{ height: 360 }} className={`chart`}>
      {processedData && (
        <ResponsiveBar
          data={processedData}
          keys={["totalInvites"]}
          indexBy="date"
          margin={{ bottom: 80, left: 60 }}
          groupMode="grouped"
          colors={{ scheme: "nivo" }}
          axisBottom={{
            tickValues: "every 1 day",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: "Date",
            legendPosition: "middle",
            legendOffset: 60,
            format: (value) => dayjs(value).format("MMM DD"),
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Total Invites",
            legendPosition: "middle",
            legendOffset: -50,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          tooltip={({ indexValue, value }) => (
            <strong>
              {indexValue}: {value}
            </strong>
          )}
        />
      )}
    </div>
  );
};

export default TimeRangeChart;
