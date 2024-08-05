import { Card, Text, Title } from "@mantine/core";
import TimeRangeChart from "@/components/TimeRangeChart/TimeRangeChart";
import InvitesTable from "@/components/InvitesTable/InvitesTable";
import useUser from "@/hooks/useUser";

export default () => {
  return (
    <div className={`flex flex-col gap-2`}>
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          Interview Invites
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Discover interview invites shared by fellow medical residency
          applicants, along with their qualifications and experiences at the
          time of the invite.
        </Text>
      </header>
      <InvitesTable className={`xl:hidden`} />

      <div className={`grid grid-cols-[1.5fr_1fr] gap-4 max-xl:hidden`}>
        <div>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <InvitesTable />
          </Card>
        </div>
        <div className={`flex flex-col gap-4`}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} className={`font-medium mb-6`}>
              Interview Invites Over Time
            </Title>
            <TimeRangeChart />
          </Card>
        </div>
      </div>
    </div>
  );
};
