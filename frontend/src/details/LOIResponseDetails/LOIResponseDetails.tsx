import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import loiResponseService from "@/services/loiResponseService";
import { notifications } from "@mantine/notifications";

export default function LOIResponseDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => loiResponseService.deleteLOIResponse(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "LOI Response deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["loiResponse"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the LOI Response",
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
        <Link to={`/loi-response/${item.id}`}>
          <Button>Update LOI Response</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete LOI Response
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Intent:</strong> {item.intent ? "Yes" : "No"}
      </Text>
      <Text>
        <strong>Sent To:</strong> {item.sentTo}
      </Text>
      <Text>
        <strong>Date Sent:</strong> {item.dateSent}
      </Text>
      <Text>
        <strong>Response:</strong> {item.response ? "Yes" : "No"}
      </Text>
      <Text>
        <strong>Response Tone:</strong> {item.responseTone}
      </Text>
      <Text>
        <strong>Time Between Sent and Response:</strong>{" "}
        {item.timeBetweenSentAndResponse}
      </Text>
      <Text>
        <strong>Mentioned Top Choice:</strong>{" "}
        {item.mentionedTopChoice ? "Yes" : "No"}
      </Text>
    </div>
  );
}
