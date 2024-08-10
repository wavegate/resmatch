import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import withdrawalService from "@/services/withdrawalService";
import { notifications } from "@mantine/notifications";

export default function WithdrawalDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => withdrawalService.deleteWithdrawal(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Withdrawal deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["withdrawal"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the withdrawal",
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
        <Link to={`/withdrawal/${item.id}`}>
          <Button>Update Withdrawal</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Withdrawal
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Date:</strong> {item.date.toLocaleDateString()}
      </Text>
      <Text>
        <strong>Reason:</strong> {item.reason || "N/A"}
      </Text>
    </div>
  );
}
