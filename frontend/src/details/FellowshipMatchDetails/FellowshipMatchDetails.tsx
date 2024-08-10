import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fellowshipMatchService from "@/services/fellowshipMatchService";
import { notifications } from "@mantine/notifications";

export default function FellowshipMatchDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => fellowshipMatchService.deleteFellowshipMatch(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Fellowship Match deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["fellowshipMatch"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the Fellowship Match",
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
        <Link to={`/fellowship-match/${item.id}`}>
          <Button>Update Fellowship Match</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Fellowship Match
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Year:</strong> {item.year}
      </Text>
      <Text>
        <strong>User:</strong> {item.user.alias}
      </Text>
      <Text>
        <strong>Details:</strong> {item.details}
      </Text>
    </div>
  );
}
