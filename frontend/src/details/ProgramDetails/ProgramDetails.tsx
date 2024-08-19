import { Accordion, Button, Group } from "@mantine/core";
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
    <Accordion.Panel>
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
      <div
        className={`grid grid-cols-[auto_1fr_auto_1fr] max-sm:grid-cols-1 gap-4 border border-solid rounded-sm p-4`}
      >
        <div className={`grid col-span-2 grid-cols-subgrid max-sm:col-span-1`}>
          <div className={`font-medium`}>NRMP Program Code:</div>
          <div className={`text-gray-600`}>{item.nrmpProgramCode}</div>
        </div>
      </div>
      {/* <div>{item.specialty.name}</div> */}
      {/* <div>{item.institution.city?.name}</div>
      <div>{item.institution.city?.state}</div> */}
    </Accordion.Panel>
  );
}
