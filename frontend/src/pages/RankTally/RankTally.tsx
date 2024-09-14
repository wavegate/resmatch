import { Table, Loader, Center, Title, Text } from "@mantine/core";
import rankListService from "@/services/rankListService";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";

const RankTallyPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: [`rankTally`],
    queryFn: () => {
      return rankListService.getProgramRankTally();
    },
  });

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Helmet>
        <title>Rank Tally | {APP_NAME}</title>
      </Helmet>
      <div className={`flex flex-col gap-2`}>
        <header>
          <Title
            order={2}
            mb={{ base: "xs", md: "sm" }}
            className="text-lg sm:text-xl md:text-2xl"
          >
            Rank Tally
          </Title>

          <Text
            c="dimmed"
            mb={{ base: "xs", md: "sm" }}
            className="text-sm sm:text-base md:text-lg"
          >
            A tally of the cumulative amount of rankings from the rank lists.
          </Text>
        </header>
        <Table>
          <thead>
            <tr>
              <th>Program</th>
              <th>Institution</th>
              <th>Rank 1</th>
              <th>Rank 2</th>
              <th>Rank 3</th>
              <th>Rank 4</th>
              <th>Rank 5</th>
              <th>Rank 6+</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.program.name}</td>
                <td>{entry.program.institution.name}</td>
                <td>{entry.rankTally[1] || 0}</td>
                <td>{entry.rankTally[2] || 0}</td>
                <td>{entry.rankTally[3] || 0}</td>
                <td>{entry.rankTally[4] || 0}</td>
                <td>{entry.rankTally[5] || 0}</td>
                <td>{entry.rankTally[6] || 0}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default RankTallyPage;
