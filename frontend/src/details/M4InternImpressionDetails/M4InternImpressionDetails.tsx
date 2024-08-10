import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import m4InternImpressionService from "@/services/m4InternImpressionService";
import { notifications } from "@mantine/notifications";

export default function M4InternImpressionDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () =>
      m4InternImpressionService.deleteM4InternImpression(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "M4 Intern Impression deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["m4InternImpression"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the M4 Intern Impression",
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
        <Link to={`/m4-intern-impression/${item.id}`}>
          <Button>Update M4 Intern Impression</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete M4 Intern Impression
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Positive Impression:</strong> {item.positiveImpression}
      </Text>
      <Text>
        <strong>Negative Impression:</strong> {item.negativeImpression}
      </Text>
    </div>
  );
}
