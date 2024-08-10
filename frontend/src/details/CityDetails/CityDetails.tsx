import { Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cityService from "@/services/cityService";
import { notifications } from "@mantine/notifications";

export default function CityDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => cityService.deleteCity(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "City deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["city"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the city",
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
        <Link to={`/city/${item.id}`}>
          <Button>Update City</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete City
        </Button>
      </Group>
      <div>{item.name}</div>
      <div>{item.state}</div>
    </div>
  );
}
