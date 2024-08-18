import { Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import programService from "@/services/programService";
import { notifications } from "@mantine/notifications";

export default function ProgramDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => programService.deleteProgram(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Program deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["program"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the program",
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div>
      {/* <Group justify="apart">
        <Link to={`/program/${item.id}`}>
          <Button>Update program</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Program
        </Button>
      </Group> */}
      <div>NRMP Program Code: {item.nrmpProgramCode}</div>
      {/* <div>{item.specialty.name}</div> */}
      <div>{item.institution.city?.name}</div>
      <div>{item.institution.city?.state}</div>
    </div>
  );
}
