import { ResponsiveBar } from "@nivo/bar";
import dayjs from "dayjs";
import "./style.css";
import inviteService from "@/services/inviteService";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@mantine/hooks";
import { Card, Text, Loader } from "@mantine/core";

const labelMap = {
  totalGoldInvites: "Gold",
  totalSilverInvites: "Silver",
  totalSignalInvites: "Signal (Unspecified)",
  totalNoSignalInvites: "No Signal",
};

// Define colors for signals
const signalColors = {
  totalGoldInvites: "#FFD866", // Gold color
  totalSilverInvites: "#ECECEC", // Silver color
  totalSignalInvites: "#C7D9E8", // Signal (Unspecified) color
  totalNoSignalInvites: "#F7EADE", // No Signal color
};

const SignalsOverTimeChart = () => {
  const mobile = useMediaQuery("(max-width: 768px)");

  // Fetch the signals over time data
  const {
    data: totalInvitesData,
    error: totalInvitesError,
    isLoading: isTotalInvitesLoading,
  } = useQuery({
    queryKey: ["signals-over-time"],
    queryFn: () => inviteService.getSignalsOverTime(),
  });

  // Process and format the data
  const processedData = totalInvitesData
    ?.map((d) => ({
      ...d,
      week: dayjs(d.week).utc().format("YYYY-MM-DD"), // Format the week in UTC using dayjs
    }))
    .sort((a, b) => dayjs(a.week).utc().unix() - dayjs(b.week).utc().unix()); // Sort by UTC week

  // Loading and error handling
  if (isTotalInvitesLoading) return <Loader />;
  if (totalInvitesError) return <div>Error loading data</div>;

  return (
    <Card shadow="sm" withBorder radius="lg" className={`sm:min-w-[50%]`}>
      <div className="flex flex-col">
        <Text className="text-xl font-medium">Signal Invites Over Time</Text>
        <Text className="text-gray-500 text-sm mb-4">
          A breakdown of signal types sent per week.
        </Text>
        <div style={{ height: mobile ? 240 : 360 }} className="chart">
          {processedData && (
            <ResponsiveBar
              data={processedData}
              keys={[
                "totalNoSignalInvites", // No Signal at bottom
                "totalSignalInvites", // Signal (Unspecified)
                "totalSilverInvites", // Silver second
                "totalGoldInvites", // Gold on top
              ]}
              indexBy="week"
              margin={{ bottom: 80, left: 60, right: mobile ? 0 : 160 }}
              groupMode="stacked" // Stacked mode for cumulative signals per week
              colors={({ id }) => signalColors[id]} // Use the defined signal colors
              axisBottom={{
                tickValues: "every 1 week",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 45,
                legend: "Week",
                legendPosition: "middle",
                legendOffset: 60,
                format: (value) => dayjs(value).utc().format("MMM DD"),
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
              labelTextColor="#333333" // Set the bar labels to a darker color
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
                  // Custom labels for the legend with specific colors
                  data: [
                    {
                      id: "totalGoldInvites",
                      label: "Gold",
                      color: signalColors.totalGoldInvites,
                    },
                    {
                      id: "totalSilverInvites",
                      label: "Silver",
                      color: signalColors.totalSilverInvites,
                    },
                    {
                      id: "totalSignalInvites",
                      label: "Signal (Unspecified)",
                      color: signalColors.totalSignalInvites,
                    },
                    {
                      id: "totalNoSignalInvites",
                      label: "No Signal",
                      color: signalColors.totalNoSignalInvites,
                    },
                  ],
                },
              ]}
              tooltip={({ id, indexValue, value }) => (
                <strong>
                  {labelMap[id]} in week of {indexValue}: {value}
                </strong>
              )}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default SignalsOverTimeChart;
