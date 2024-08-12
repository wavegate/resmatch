import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import rankListService from "@/services/rankListService";
import { notifications } from "@mantine/notifications";
import { useMemo } from "react";

export default function RankListDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => rankListService.deleteRankList(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Rank List deleted successfully",
        color: "green",
      });

      // Invalidate specific rankList queries based on graduateType and medicalDegree
      if (item.graduateType === "IMG") {
        queryClient.invalidateQueries({ queryKey: ["rankList-img"] });
      } else if (item.medicalDegree === "MD") {
        queryClient.invalidateQueries({ queryKey: ["rankList-md"] });
      } else if (item.medicalDegree === "DO") {
        queryClient.invalidateQueries({ queryKey: ["rankList-do"] });
      }
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the Rank List",
        color: "red",
      });
    },
  });

  const type = useMemo(() => {
    if (item.graduateType === "IMG") {
      return "img";
    } else if (item.medicalDegree === "MD") {
      return "md";
    } else if (item.medicalDegree === "DO") {
      return "do";
    }
  }, [item]);

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div>
      <Group justify="apart">
        <Link to={`/rank-list-${type}/${item.id}`}>
          <Button>Update Rank List</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Rank List
        </Button>
      </Group>
      <Text>
        <strong>Graduate Type:</strong> {item.graduateType}
      </Text>
      <Text>
        <strong>Medical Degree:</strong> {item.medicalDegree}
      </Text>
      <Text>
        <strong>Number of Programs Applied:</strong>{" "}
        {item.numberOfProgramsApplied}
      </Text>
      <Text>
        <strong>Number of Invites:</strong> {item.numberOfInvites}
      </Text>
      <Text>
        <strong>Number of Interviews Attended:</strong>{" "}
        {item.numberOfInterviewsAttended}
      </Text>
      <Text>
        <strong>Done With Interviews:</strong>{" "}
        {item.doneWithInterviews ? "Yes" : "No"}
      </Text>
      <Text>
        <strong>Why Number One:</strong> {item.whyNumberOne}
      </Text>
      <Text>
        <strong>Priorities When Ranking:</strong> {item.prioritiesWhenRanking}
      </Text>
      <Text>
        <strong>Hardest Part Of Ranking:</strong> {item.hardestPartOfRanking}
      </Text>
      <Text>
        <strong>Matched Program:</strong> {item.matchedProgram?.name}
      </Text>

      <Text mt="lg" w={500} size="lg">
        Ranked Programs:
      </Text>
      {item.RankedProgram?.length > 0 ? (
        <div>
          {item.RankedProgram.sort((a, b) => a.rank - b.rank).map(
            (rankedProgram) => (
              <Text key={rankedProgram.id}>
                {rankedProgram.rank}. {rankedProgram.program.name} at{" "}
                {rankedProgram.program.institution.name}
              </Text>
            )
          )}
        </div>
      ) : (
        <Text>No programs ranked.</Text>
      )}
    </div>
  );
}
