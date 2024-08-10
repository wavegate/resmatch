import InvitesTable from "@/tables/InvitesTable/InvitesTable";
import { Text, Title } from "@mantine/core";

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
      <InvitesTable />
    </div>
  );
};
