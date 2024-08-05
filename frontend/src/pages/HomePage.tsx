import TimeRangeChart from "@/components/TimeRangeChart/TimeRangeChart";
import { Card, Title } from "@mantine/core";

export default () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4} className={`font-medium mb-6`}>
        Interview Invites Over Time
      </Title>
      <TimeRangeChart />
    </Card>
  );
};
