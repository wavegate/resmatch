import React from "react";
import {
  Card,
  Divider,
  Text,
  SimpleGrid,
  Button,
  Group,
  Avatar,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import services from "@/services/services";
import { schemas } from "@/schemas/schemas";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import Comment from "@/components/Comment/Comment";
import AddCommentField from "@/components/AddCommentField";
import useUser from "@/hooks/useUser";
import { pageDescription } from "@/schemas/pageDescription";
import programName from "@/utils/programName";
import { generateGravatarUrl } from "@/utils/utils";
import dayjs from "dayjs";
import UserLink from "./UserLink";
import { modals } from "@mantine/modals";

interface DataDisplayProps {
  data: any;
  modelName: string; // The name of the model, e.g., "interviewLogistics"
  i: number;
  queryKey: any;
}

const Header: React.FC<DataDisplayProps> = ({ data, modelName, queryKey }) => {
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

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Delete this ${labels.singular}?`,
      centered: true,
      children: <Text size="sm">This action cannot be reversed.</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      // onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteMutation.mutate();
      },
    });

  const dateModels = ["interviewInvite", "interviewRejection", "dropped"];

  return (
    <div
      className={`${
        dateModels.includes(modelName) && `grid grid-cols-[80px,1fr] gap-4`
      }`}
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
        <div className={`font-medium text-lg`}>{programName(data.program)}</div>
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
                to={`/${modelName}/${data.id}`}
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
    </div>
  );
};

export default Header;
