import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fameShameService from "@/services/fameShameService";
import { notifications } from "@mantine/notifications";

export default function FameShameDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => fameShameService.deleteFameShame(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Fame/Shame entry deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["fameShame"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the Fame/Shame entry",
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
        <Link to={`/fame-shame/${item.id}`}>
          <Button>Update Fame/Shame</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Fame/Shame
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name} at{" "}
        {item.program.institution.name}
      </Text>
      <Text>
        <strong>Fame:</strong> {item.fame}
      </Text>
      <Text>
        <strong>Shame:</strong> {item.shame}
      </Text>
    </div>
  );
}
