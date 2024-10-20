import { ResponsiveBar } from "@nivo/bar";
import dayjs from "dayjs";
import "./style.css";
import inviteService from "@/services/inviteService";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@mantine/hooks";
import { Card, Text, Loader } from "@mantine/core";

const labelMap = {
  US: "US Applicants",
  IMG: "IMG Applicants",
};

const TimeRangeChart = () => {
  const mobile = useMediaQuery("(max-width: 768px)");

  // Fetch the data for total invites over time
  const {
    data: totalInvitesData,
    error: totalInvitesError,
    isLoading: isTotalInvitesLoading,
  } = useQuery({
    queryKey: ["total-invites-over-time"],
    queryFn: () => inviteService.getTotalInvitesOverTime(),
  });

  // Process and format the data
  const processedData = totalInvitesData
    ?.map((d) => ({
      ...d,
      date: dayjs(d.date).utc().format("YYYY-MM-DD"),
    }))
    .sort((a, b) => dayjs(a.date).utc().unix() - dayjs(b.date).utc().unix());

  // Loading and error handling
  if (isTotalInvitesLoading) return <Loader />;
  if (totalInvitesError) return <div>Error loading data</div>;

  return (
    <Card shadow="sm" withBorder radius="lg">
      <div className="flex flex-col">
        <Text className="text-xl font-medium">Invites Over Time</Text>
        <Text className="text-gray-500 text-sm mb-4">
          Total US and IMG invites per day.
        </Text>
        <div style={{ height: mobile ? 240 : 360 }} className="chart">
          {processedData && (
            <ResponsiveBar
              data={processedData}
              keys={["US", "IMG"]} // Two keys: US and IMG invites
              indexBy="date"
              margin={{ bottom: 80, left: 60, right: mobile ? 0 : 80 }}
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
      </div>
    </Card>
  );
};

export default TimeRangeChart;
