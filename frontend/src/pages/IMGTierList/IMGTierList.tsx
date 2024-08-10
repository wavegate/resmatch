import { Accordion, Loader, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import tierListService from "@/services/tierListService";
import NoRecords from "@/components/NoRecords/NoRecords";

export default () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tierList", 2], // Hardcoding ID 1 for now
    queryFn: () => tierListService.readTierList(2),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <Loader color="blue" className="mt-12" />
      </div>
    );
  }

  if (!data) {
    return <NoRecords />;
  }

  return (
    <div className="flex flex-col gap-4">
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          {data.title}
        </Title>
        {data.img && (
          <Text
            c="dimmed"
            mb={{ base: "xs", md: "sm" }}
            className="text-sm sm:text-base md:text-lg"
          >
            This tier list includes IMG (International Medical Graduates)
            programs.
          </Text>
        )}
      </header>
      <Accordion>
        {data.bins.map((bin: any) => (
          <Accordion.Item key={bin.id} value={bin.id.toString()}>
            <Accordion.Control>
              <Text className="font-medium">{bin.name}</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <ul>
                {bin.programs.map((program: any) => (
                  <li key={program.id}>
                    {program.name} at {program.institution.name}
                  </li>
                ))}
              </ul>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};
