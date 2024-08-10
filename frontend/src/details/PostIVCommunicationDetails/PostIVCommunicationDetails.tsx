import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postIVCommunicationService from "@/services/postIVCommunicationService";
import { notifications } from "@mantine/notifications";

export default function PostIVCommunicationDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () =>
      postIVCommunicationService.deletePostIVCommunication(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Post-IV Communication deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["postIVCommunication"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the Post-IV Communication",
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
        <Link to={`/post-iv-communication/${item.id}`}>
          <Button>Update Post-IV Communication</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Post-IV Communication
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Communication Received:</strong> {item.communicationReceived}
      </Text>
      <Text>
        <strong>Thank You Letter Policy:</strong> {item.thankYouLetterPolicy}
      </Text>
      <Text>
        <strong>Rank Impact:</strong> {item.rankImpact}
      </Text>
      <Text>
        <strong>Source:</strong> {item.source}
      </Text>
    </div>
  );
}
