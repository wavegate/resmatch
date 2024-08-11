import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import secondLookService from "@/services/secondLookService";
import { notifications } from "@mantine/notifications";

export default function SecondLookDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => secondLookService.deleteSecondLook(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Second Look entry deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["secondLook"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the Second Look entry",
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div>
      <Group justify="apart">
        <Link to={`/second-look/${item.id}`}>
          <Button>Update Second Look Entry</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Second Look Entry
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Setting:</strong> {item.setting}
      </Text>
      <Text>
        <strong>Date:</strong>{" "}
        {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
      </Text>
      <Text>
        <strong>Bearing on Rank:</strong> {item.bearingOnRank}
      </Text>
    </div>
  );
}
