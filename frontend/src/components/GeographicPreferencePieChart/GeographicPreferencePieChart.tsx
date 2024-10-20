import inviteService from "@/services/inviteService";
import { useQuery } from "@tanstack/react-query";
import { Loader, Card, Text } from "@mantine/core";
import { ResponsivePie } from "@nivo/pie";
import { useMediaQuery } from "@mantine/hooks";

const GeographicPreferencePieChart = () => {
  const mobile = useMediaQuery("(max-width: 768px)");

  // Fetch geographically preferred data
  const {
    data: geographicPreferenceData,
    error: geographicPreferenceError,
    isLoading: isGeographicPreferenceLoading,
  } = useQuery({
    queryKey: ["invites-by-geographic-preference"],
    queryFn: () => inviteService.getInvitesByGeographicPreference(),
  });

  // Loading and error handling
  if (isGeographicPreferenceLoading) {
    return <Loader />;
  }

  if (geographicPreferenceError) {
    return <div>Error loading data</div>;
  }

  // Prepare the data for the pie chart
  const pieChartData = geographicPreferenceData?.map((entry: any) => ({
    id: entry.inviteType,
    value: entry.inviteCount,
  }));

  return (
    <Card shadow="sm" radius="lg" withBorder>
      <div className="flex flex-col">
        <Text className="text-xl font-medium">Geographic Preference</Text>
        <Text className="text-gray-500 text-sm mb-4">
          All invites split by geographic preference.
        </Text>
        <div style={{ height: mobile ? 200 : 400 }}>
          <ResponsivePie
            data={pieChartData}
            margin={{ top: 0, right: 40, bottom: 0, left: 40 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "nivo" }} // You can customize the color scheme if needed
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            radialLabelsTextColor="#333333"
            radialLabelsLinkColor={{ from: "color" }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#333333"
          />
        </div>
      </div>
    </Card>
  );
};

export default GeographicPreferencePieChart;
