import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import impressionService from "@/services/impressionService";
import { notifications } from "@mantine/notifications";

export default function ImpressionDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => impressionService.deleteImpression(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Interview Impression deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["impression"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the Interview Impression",
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
        <Link to={`/impression/${item.id}`}>
          <Button>Update Interview Impression</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Interview Impression
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Positives:</strong> {item.positives}
      </Text>
      <Text>
        <strong>Negatives:</strong> {item.negatives}
      </Text>
      <Text>
        <strong>How Interview Day Affects Rank:</strong>{" "}
        {item.howInterviewDayAffectsRank}
      </Text>
      <Text>
        <strong>Gift:</strong> {item.gift}
      </Text>
      <Text>
        <strong>Time Gift Received:</strong> {item.timeGiftReceived}
      </Text>
    </div>
  );
}
