import { ResponsiveBar } from "@nivo/bar";
import dayjs from "dayjs";
import "./style.css";
import inviteService from "@/services/inviteService";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@mantine/hooks";

const labelMap = {
  totalUSInvites: "US Applicants",
  totalIMGInvites: "IMG Applicants",
};

const TimeRangeChart = () => {
  const mobile = useMediaQuery("(max-width: 768px)");
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
      date: dayjs(d.date).utc().format("YYYY-MM-DD"), // Format the date in UTC using dayjs
    }))
    .sort((a, b) => dayjs(a.date).utc().unix() - dayjs(b.date).utc().unix()); // Sort by UTC date

  return (
    <div style={{ height: mobile ? 240 : 360 }} className={`chart`}>
      {processedData && (
        <ResponsiveBar
          data={processedData}
          keys={["totalUSInvites", "totalIMGInvites"]} // Two keys: US and IMG invites
          indexBy="date"
          margin={{ bottom: 80, left: 60 }}
          groupMode="stacked" // Change from 'grouped' to 'stacked' to stack bars vertically
          colors={{ scheme: "nivo" }} // Adjust if needed for better color clarity
          axisBottom={{
            tickValues: "every 1 day",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: "Date",
            legendPosition: "middle",
            legendOffset: 60,
            format: (value) => dayjs(value).utc().format("MMM DD"), // Format date in UTC for the bottom axis
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
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          tooltip={({ id, indexValue, value }) => (
            <strong>
              {labelMap[id]} on {indexValue}: {value}
            </strong>
          )}
        />
      )}
    </div>
  );
};

export default TimeRangeChart;
