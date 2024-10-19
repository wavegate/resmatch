import UserLink from "@/components/UserLink";
import useUser from "@/hooks/useUser";
import rankListService from "@/services/rankListService";
import programName from "@/utils/programName";
import { Accordion, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface RankListHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function RankListHeader({
  item: data,
  type,
}: RankListHeaderProps) {
  const queryClient = useQueryClient();
  // Mutation for deleting the entry
  const deleteMutation = useMutation({
    mutationFn: () => rankListService.deleteRankList(data.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: `Rank list deleted successfully`,
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: [`rankList-${type.toLowerCase()}`],
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: `Failed to delete the rank list`,
        color: "red",
      });
    },
  });

  const { user } = useUser();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Delete this rank list?`,
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
      {/* <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`Rank List`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Number of Programs Applied: ${item.numProgramsApplied}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Number of Invites: ${item.numInvites}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Number of Interviews Attended: ${item.numInterviewsAttended}`}
        </Text>
        {item.matchedProgram && (
          <Text className="text-xs sm:text-sm">
            {`Matched Program: ${item.matchedProgram.name} at ${item.matchedProgram.institution.name}`}
          </Text>
        )}
        <div className="flex items-center gap-2">
          {item.user && (
            <Link to={`/user/${item.user.id}`}>
              <Text c="dimmed" className="text-xs sm:text-sm underline">
                {item.user.alias}
              </Text>
            </Link>
          )}
        </div>
      </div> */}
      <div className={`flex flex-col gap-1`}>
        <div className={`font-medium text-lg`}>Rank List</div>

        {/* Display user alias or 'Anonymous' */}
        <div
          className={`text-sm text-gray-500 flex gap-1.5 items-center flex-wrap`}
        >
          <UserLink data={data} />
          <div>·</div>
          <div>{dayjs(data.createdAt).format("M/D/YYYY [at] ha")}</div>
          {/* Buttons for update and delete */}
          {user && user?.id === data.userId && (
            <div className={`ml-4 flex gap-4 items-center`}>
              <Link
                to={`/rank-list-${type}/${data.id}`}
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
