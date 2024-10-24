import inviteService from "@/services/inviteService";
import { useQuery } from "@tanstack/react-query";
import { Loader, Card, Text, Overlay, Button } from "@mantine/core";
import { ResponsiveBoxPlot } from "@nivo/boxplot";
import { useMediaQuery } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { FaEye } from "react-icons/fa"; // React icon for the eye symbol

const InviteQuantiles = () => {
  const mobile = useMediaQuery("(max-width: 768px)");

  // State to control the visibility of the overlay
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  // Fetch invite quantiles data
  const {
    data: inviteQuantilesData,
    error: inviteQuantilesError,
    isLoading: isInviteQuantilesLoading,
  } = useQuery({
    queryKey: ["invite-quantiles"],
    queryFn: () => inviteService.getInviteQuantiles(),
  });

  const maxValue = useMemo(() => {
    if (inviteQuantilesData) {
      return Math.max(...inviteQuantilesData.map((item) => item.value));
    }
  }, [inviteQuantilesData]);

  // Loading and error handling
  if (isInviteQuantilesLoading) {
    return <Loader />;
  }

  if (inviteQuantilesError) {
    return <div>Error loading data</div>;
  }

  return (
    <Card shadow="sm" radius="lg" withBorder style={{ position: "relative" }}>
      <div className="flex flex-col">
        <Text className="text-xl font-medium">Average Invites per User</Text>
        <Text className="text-gray-500 text-sm mb-4">
          Distribution of non-anonymous invites per user.
        </Text>
        <div className={`relative`}>
          {/* Overlay for viewer discretion */}
          {isOverlayVisible && (
            <Overlay
              zIndex={10}
              blur={80}
              backgroundOpacity={0}
              className={`rounded-lg overflow-hidden flex flex-col gap-2 justify-center items-center hover:cursor-pointer`}
              onClick={() => setIsOverlayVisible(false)}
            >
              <FaEye size={28} />
              <Text className="text-lg font-medium">Click to reveal</Text>
            </Overlay>
          )}
          <div style={{ height: mobile ? 200 : 400 }}>
            <ResponsiveBoxPlot
              maxValue={maxValue}
              minValue={0}
              data={inviteQuantilesData}
              margin={{ top: 0, bottom: 50, left: 80 }}
              axisBottom={{
                legend: "Applicant Type",
                legendPosition: "middle",
                legendOffset: 40,
              }}
              axisLeft={{
                legend: "Invite Count",
                legendPosition: "middle",
                legendOffset: -50,
              }}
              whiskerEndSize={0.6}
              borderRadius={2}
              colors={{ scheme: "nivo" }}
              borderWidth={2}
              whiskerWidth={3}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InviteQuantiles;
