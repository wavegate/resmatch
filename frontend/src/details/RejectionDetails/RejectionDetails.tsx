import { Accordion, Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import rejectionService from "@/services/rejectionService";
import { notifications } from "@mantine/notifications";

export default function RejectionDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => rejectionService.deleteRejection(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Rejection deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["rejection"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the rejection",
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Accordion.Panel>
      <Group justify="apart">
        <Link to={`/rejection/${item.id}`}>
          <Button>Update Rejection</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Rejection
        </Button>
      </Group>
    </Accordion.Panel>
  );
}
