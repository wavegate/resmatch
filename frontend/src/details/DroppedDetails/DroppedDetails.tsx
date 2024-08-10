import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import droppedService from "@/services/droppedService";
import { notifications } from "@mantine/notifications";

export default function DroppedDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => droppedService.deleteDropped(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Dropped entry deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["dropped"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the Dropped entry",
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
        <Link to={`/dropped/${item.id}`}>
          <Button>Update Dropped Entry</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Dropped Entry
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Reason Dropped:</strong> {item.reason}
      </Text>
    </div>
  );
}
