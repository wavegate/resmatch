import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import malignantService from "@/services/malignantService";
import { notifications } from "@mantine/notifications";

export default function MalignantDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => malignantService.deleteMalignant(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Malignant entry deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["malignant"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the Malignant entry",
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
        <Link to={`/malignant/${item.id}`}>
          <Button>Update Malignant Entry</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Malignant Entry
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Malignant:</strong> {item.malignant}
      </Text>
      <Text>
        <strong>Source:</strong> {item.source}
      </Text>
      <Text>
        <strong>Explanation:</strong> {item.explanation}
      </Text>
    </div>
  );
}
