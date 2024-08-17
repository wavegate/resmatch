import React, { useEffect, useState } from "react";
import { Table, Loader, Center } from "@mantine/core";
import rankListService from "@/services/rankListService";
import { useQuery } from "@tanstack/react-query";

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
        {data.map((entry) => (
          <tr key={entry.id}>
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
  );
};

export default RankTallyPage;
