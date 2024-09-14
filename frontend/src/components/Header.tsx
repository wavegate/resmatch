import { Button, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import services from "@/services/services";
import useUser from "@/hooks/useUser";
import { pageDescription } from "@/schemas/pageDescription";
import programName from "@/utils/programName";
import dayjs from "dayjs";
import UserLink from "./UserLink";
import { modals } from "@mantine/modals";

interface DataDisplayProps {
  data: any;
  modelName: string; // The name of the model, e.g., "interviewLogistics"
  i: number;
  queryKey: any;
}

const Header = ({ data, modelName, queryKey, detailsPage }) => {
  const queryClient = useQueryClient();

  const labels = pageDescription[modelName];

  // Mutation for deleting the entry
  const deleteMutation = useMutation({
    mutationFn: () => services[modelName].delete(data.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: `${labels.singular} entry deleted successfully`,
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: [modelName] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: `Failed to delete the ${labels.singular} entry`,
        color: "red",
      });
    },
  });

  const { user } = useUser();
  const navigate = useNavigate();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: (
        <span
          className={`font-medium`}
        >{`Delete this ${labels.singular}?`}</span>
      ),
      centered: true,
      children: <Text size="sm">This action cannot be reversed.</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        if (detailsPage) {
          navigate(-1);
        }
        deleteMutation.mutate();
      },
    });

  const dateModels = ["interviewInvite", "interviewRejection", "dropped"];

  return (
    <div
      className={`${
        dateModels.includes(modelName) && `grid grid-cols-[80px,1fr] gap-4`
      } bg-primary bg-opacity-10 px-4 py-2`}
    >
      {dateModels.includes(modelName) && (
        <div className="flex flex-col justify-center items-center text-gray-700 bg-white border border-solid rounded">
          <Text className="text-lg font-medium">
            {dayjs(data.date).format("MMM D")}
          </Text>
          <Text c="dimmed" className="text-xs">
            {dayjs(data.date).format("YYYY")}
          </Text>
        </div>
      )}

      <div className={`flex flex-col gap-1`}>
        <div className={`font-medium text-lg`}>
          {modelName === "cityUserInput"
            ? `${data.city.name}, ${data.city.state}`
            : modelName === "xorY"
            ? `${programName(data.programX)} vs ${programName(data.programY)}`
            : programName(data.program)}
        </div>
        {/* Display user alias or 'Anonymous' */}
        <div
          className={`text-sm text-gray-500 flex gap-1.5 items-center flex-wrap`}
        >
          <UserLink data={data} />
          <div>·</div>
          <div>{dayjs(data.createdAt).format("M/D/YYYY [at] ha")}</div>
          {/* Buttons for update and delete */}
          <div className={`ml-4 flex gap-4 items-center`}>
            {/* Details link is always visible */}
            {!detailsPage && (
              <Link
                to={`/${modelName}/${data.id}/details`}
                className={`text-sm underline text-gray-500`}
              >
                Details
              </Link>
            )}

            {/* Edit and Delete links only visible if user is logged in and matches the userId */}
            {user?.id === data.userId && (
              <>
                <Link
                  to={`/${modelName}/${data.id}`}
                  className={`text-sm underline text-gray-500`}
                >
                  Edit
                </Link>
                <div
                  className={`text-sm underline text-red-500 hover:cursor-pointer`}
                  onClick={openDeleteModal}
                >
                  Delete
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
