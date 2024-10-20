import inviteService from "@/services/inviteService";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import { ResponsiveChoropleth } from "@nivo/geo";
import usaStatesGeoJson from "./us-states.json"; // Import the USA states GeoJSON data
import worldCountries from "./world_countries.json"; // Import the USA states GeoJSON data
import states from "./states.json"; // Import the USA states GeoJSON data
import { useViewportSize } from "@mantine/hooks";

const calculateTranslation = (width: number): number => {
  const width1 = 1459;
  const translation1 = 1.4;
  const width2 = 437;
  const translation2 = 2.9;

  // If width is greater than width1, return the minimum translation
  if (width >= width1) {
    return translation1;
  }

  // If width is smaller than width2, return the maximum translation
  if (width <= width2) {
    return translation2;
  }

  // Linear interpolation between the two points
  return (
    translation1 +
    ((width - width1) / (width2 - width1)) * (translation2 - translation1)
  );
};

const StatesInvites = () => {
  const { height, width } = useViewportSize();
  // Fetch the number of invites per state
  const {
    data: invitesData,
    error: invitesError,
    isLoading: isInvitesLoading,
  } = useQuery({
    queryKey: ["invites-by-state"],
    queryFn: () => inviteService.getInvitesByState(),
  });

  // Loading and error handling
  if (isInvitesLoading) {
    return <Loader />;
  }

  if (invitesError) {
    return <div>Error loading data</div>;
  }

  // Prepare data for the choropleth chart
  const choroplethData = usaStatesGeoJson.features.map((feature) => {
    const stateName = feature.properties.name;
    const stateId = feature.id; // Extract ID directly from GeoJSON feature
    const inviteEntry = invitesData.find(
      (entry: any) => entry.state === stateName
    );

    return {
      id: stateId, // Use ID directly from GeoJSON
      value: inviteEntry ? inviteEntry.inviteCount : 0, // Default to 0 if no data
    };
  });

  const maxValue = Math.max(...choroplethData.map((d: any) => d.value));
  console.log(width);

  return (
    <div style={{ height: 500 }}>
      <h2>Invites by State</h2>
      <ResponsiveChoropleth
        data={choroplethData}
        features={states} // USA states GeoJSON
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[0, maxValue]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={600}
        projectionTranslation={[calculateTranslation(width), 1.4]}
        projectionRotation={[0, 0, 0]}
        enableGraticule={false}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
          {
            id: "gradient",
            type: "linearGradient",
            colors: [
              {
                offset: 0,
                color: "#000",
              },
              {
                offset: 100,
                color: "inherit",
              },
            ],
          },
        ]}
        fill={[
          {
            match: {
              id: "CAN",
            },
            id: "dots",
          },
          {
            match: {
              id: "CHN",
            },
            id: "lines",
          },
          {
            match: {
              id: "ATA",
            },
            id: "gradient",
          },
        ]}
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            justify: true,
            translateX: 20,
            translateY: -100,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: "#444444",
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default StatesInvites;
