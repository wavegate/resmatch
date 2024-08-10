import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import scheduleDetailsService from "@/services/scheduleDetailsService";
import { notifications } from "@mantine/notifications";

export default function ScheduleDetailDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => scheduleDetailsService.deleteScheduleDetails(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Schedule Detail deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["scheduleDetails"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the Schedule Detail",
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
        <Link to={`/schedule-details/${item.id}`}>
          <Button>Update Schedule Detail</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Schedule Detail
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Long Overnight Call:</strong> {item.longOvernightCall}
      </Text>
      <Text>
        <strong>Schedule Continuity:</strong> {item.scheduleContinuity}
      </Text>
      <Text>
        <strong>Locations:</strong> {item.locations}
      </Text>
      <Text>
        <strong>EMR:</strong> {item.emr}
      </Text>
      <Text>
        <strong>Start Date Orientation:</strong> {item.startDateOrientation}
      </Text>
      <Text>
        <strong>Visa Info:</strong> {item.visaInfo}
      </Text>
      <Text>
        <strong>Union:</strong> {item.union}
      </Text>
      <Text>
        <strong>Midlevel:</strong> {item.midlevel}
      </Text>
      <Text>
        <strong>Ancillary:</strong> {item.ancillary}
      </Text>
      <Text>
        <strong>Team Ratios:</strong> {item.teamRatios}
      </Text>
      <Text>
        <strong>Intern Cap:</strong> {item.internCap}
      </Text>
      <Text>
        <strong>Admitting System:</strong> {item.admittingSystem}
      </Text>
      <Text>
        <strong>ICU Hours:</strong> {item.icuHours}
      </Text>
      <Text>
        <strong>Night Float:</strong> {item.nightFloat}
      </Text>
      <Text>
        <strong>Sick Call System:</strong> {item.sickCallSystem}
      </Text>
      <Text>
        <strong>Moonlighting:</strong> {item.moonlighting}
      </Text>
      <Text>
        <strong>Stay Until Signout:</strong> {item.stayUntilSignout}
      </Text>
      <Text>
        <strong>Didactics:</strong> {item.didactics}
      </Text>
      <Text>
        <strong>Vacation Holidays:</strong> {item.vacationHolidays}
      </Text>
      <Text>
        <strong>Gym:</strong> {item.gym}
      </Text>
      <Text>
        <strong>Food:</strong> {item.food}
      </Text>
      <Text>
        <strong>Salary:</strong> {item.salary}
      </Text>
    </div>
  );
}
