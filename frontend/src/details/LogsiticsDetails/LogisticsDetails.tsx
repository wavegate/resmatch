import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import logisticsService from "@/services/logisticsService";
import { notifications } from "@mantine/notifications";
import services from "@/services/services";

export default function LogisticsDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => services.interviewLogistics.delete(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Logistics entry deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["logistics"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the Logistics entry",
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
        <Link to={`/interviewLogistics/${item.id}`}>
          <Button>Update Logistics Entry</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Logistics Entry
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Scheduler Platform:</strong> {item.schedulerPlatform}
      </Text>
      <Text>
        <strong>Interview Format:</strong> {item.ivFormat}
      </Text>
      <Text>
        <strong>Time Slots:</strong> {item.timeSlots}
      </Text>
      <Text>
        <strong>Interview Platform:</strong> {item.ivPlatform}
      </Text>
      <Text>
        <strong>Open Interview Dates:</strong> {item.openIVDates.join(", ")}
      </Text>
    </div>
  );
}
