import { Text, Title } from "@mantine/core";
import InvitesTable from "@/components/InvitesTable/InvitesTable";
import ProgramsTable from "@/components/ProgramsTable/ProgramsTable";

export default () => {
  return (
    <div className={`flex flex-col gap-2`}>
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          Programs
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
      <ProgramsTable />
    </div>
  );
};
