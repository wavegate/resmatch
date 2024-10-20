import inviteService from "@/services/inviteService";
import { useQuery } from "@tanstack/react-query";
import { Loader, Card, Text } from "@mantine/core";
import { ResponsivePie } from "@nivo/pie";
import { useMediaQuery } from "@mantine/hooks";

const GraduateTypePieChart = () => {
  const mobile = useMediaQuery("(max-width: 768px)");

  // Fetch graduate type data
  const {
    data: graduateTypeData,
    error: graduateTypeError,
    isLoading: isGraduateTypeLoading,
  } = useQuery({
    queryKey: ["invites-by-graduate-type"],
    queryFn: () => inviteService.getInvitesByGraduateType(),
  });

  // Loading and error handling
  if (isGraduateTypeLoading) {
    return <Loader />;
  }

  if (graduateTypeError) {
    return <div>Error loading data</div>;
  }

  // Prepare and order the data for the pie chart
  const pieChartData = graduateTypeData
    ?.map((entry: any) => ({
      id: entry.inviteType,
      label: entry.inviteType,
      value: entry.inviteCount,
    }))
    .sort((a, b) => {
      const order = ["MD", "DO", "US IMG", "Non-US IMG", "Unspecified"];
      return order.indexOf(a.id) - order.indexOf(b.id);
    });

  return (
    <Card shadow="sm" radius="lg" withBorder>
      <div className="flex flex-col">
        <Text className="text-xl font-medium">Graduate Type</Text>
        <Text className="text-gray-500 text-sm mb-4">
          All invites split by graduate type.
        </Text>
        <div style={{ height: mobile ? 200 : 400 }}>
          <ResponsivePie
            data={pieChartData}
            margin={{ top: 0, right: 80, bottom: 0, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "nivo" }} // You can customize the color scheme if needed
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          />
        </div>
      </div>
    </Card>
  );
};

export default GraduateTypePieChart;
