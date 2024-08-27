import UserLink from "@/components/UserLink";
import useUser from "@/hooks/useUser";
import xOrYService from "@/services/xOrYService";
import programName from "@/utils/programName";
import { Accordion, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface XorYHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function XorYHeader({
  item: data,
  queryKey,
  img,
}: XorYHeaderProps) {
  const queryClient = useQueryClient();
  // Mutation for deleting the entry
  const deleteMutation = useMutation({
    mutationFn: () => xOrYService.deleteXorY(data.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: `X or Y deleted successfully`,
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey,
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: `Failed to delete the X or Y`,
        color: "red",
      });
    },
  });

  const { user } = useUser();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Delete this X or Y?`,
      centered: true,
      children: <Text size="sm">This action cannot be reversed.</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      // onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteMutation.mutate();
      },
    });
  return (
    <Accordion.Control className="bg-primary bg-opacity-10">
      <div className={`flex flex-col gap-1`}>
        <div className={`font-medium text-lg`}>
          {programName(data.programX)} vs {programName(data.programY)}
        </div>

        {/* Display user alias or 'Anonymous' */}
        <div
          className={`text-sm text-gray-500 flex gap-1.5 items-center flex-wrap`}
        >
          <UserLink data={data} />
          <div>·</div>
          <div>{dayjs(data.createdAt).format("M/D/YYYY [at] ha")}</div>
          {/* Buttons for update and delete */}
          {user?.id === data.userId && (
            <div className={`ml-4 flex gap-4 items-center`}>
              <Link
                to={`/x-or-y${img ? "-img" : ""}/${data.id}`}
                className={`text-sm underline text-gray-500`}
              >
                Edit
              </Link>
              <div
                className={`text-sm underline text-red-500`}
                onClick={openDeleteModal}
              >
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
    </Accordion.Control>
  );
}
