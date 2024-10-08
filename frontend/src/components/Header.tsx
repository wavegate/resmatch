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
import Upvote from "./Upvote";
import { useMemo } from "react";

interface DataDisplayProps {
  data: any;
  modelName: string; // The name of the model, e.g., "interviewLogistics"
  i: number;
  queryKey: any;
}

const Header = ({
  data,
  modelName,
  queryKey,
  detailsPage,
  programDetail,
  userProfile,
}) => {
  const queryClient = useQueryClient();

  const labels = pageDescription[modelName];

  // Mutation for deleting the entry
  const deleteMutation = useMutation({
    mutationFn: () => {
      return services[modelName].delete(data.id);
    },
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

  const getBackgroundColor = () => {
    if (
      (modelName === "fameShame" && data.shame && !data.fame) ||
      (modelName === "m4InternImpression" &&
        data.negativeImpression &&
        !data.positiveImpression) ||
      (modelName === "malignant" && data.malignant === "Yes")
    ) {
      return "bg-[#E28D7B]"; // Soft Terracotta for negative/shame
    }

    if (
      (modelName === "fameShame" && data.fame && !data.shame) ||
      (modelName === "m4InternImpression" &&
        data.positiveImpression &&
        !data.negativeImpression) ||
      (modelName === "malignant" && data.malignant === "No")
    ) {
      return "bg-[#4CBB17]"; // Kelly Green for positive/fame
    }

    return "bg-primary"; // Default background
  };

  const label = pageDescription[modelName].singular;

  const title = useMemo(() => {
    if (modelName === "cityUserInput") {
      // For cityUserInput, return city and state in a div
      return (
        <div className={`font-medium sm:text-lg`}>
          {`${data.city.name}, ${data.city.state}`}
        </div>
      );
    } else if (modelName === "xorY") {
      // If modelName is "xorY" and programDetail is true, link to /modelName/id/details
      if (detailsPage) {
        return (
          <div className={`font-medium sm:text-lg`}>
            <Link
              to={`/program/${data.programXId}/details`}
              className={`font-medium sm:text-lg hover:underline`}
            >
              {programName(data.programX)}
            </Link>
            {" vs "}
            <Link
              to={`/program/${data.programYId}/details`}
              className={`font-medium sm:text-lg hover:underline`}
            >
              {programName(data.programY)}
            </Link>
          </div>
        );
      } else {
        // Otherwise, link to each program separately
        return (
          <Link
            to={`/${modelName}/${data.id}/details`}
            className={`font-medium sm:text-lg hover:underline`}
          >
            {`${programName(data.programX)} vs ${programName(data.programY)}`}
          </Link>
        );
      }
    } else if (programDetail || userProfile) {
      // For other models, link to the program details if programDetail is true
      return (
        <Link
          to={`/${modelName}/${data.id}/details`}
          className={`font-medium sm:text-lg hover:underline`}
        >
          {`${label}${
            userProfile ? ` for ${data.program?.institution?.name}` : ""
          }`}
        </Link>
      );
    } else {
      // For other models, return programName(data.program) in a div when programDetail is false
      return (
        <Link
          to={`/program/${data.programId}/details`}
          className={`font-medium sm:text-lg hover:underline`}
        >
          {programName(data.program)}
        </Link>
      );
    }
  }, [modelName, data, programDetail, userProfile, label, programName]);

  return (
    <div
      className={`${
        dateModels.includes(modelName) && `grid grid-cols-[80px,1fr] gap-4`
      } ${getBackgroundColor()} bg-opacity-10 px-4 max-sm:px-3 py-2`}
    >
      {dateModels.includes(modelName) && (
        <div className="flex flex-col justify-center items-center text-gray-700 bg-white border border-solid rounded">
          <Text className="text-lg font-medium">
            {dayjs(data.date).utc().format("MMM D")}
          </Text>
          <Text c="dimmed" className="text-xs">
            {dayjs(data.date).utc().format("YYYY")}
          </Text>
        </div>
      )}

      <div className={`flex flex-col gap-1`}>
        {title}
        {/* Display user alias or 'Anonymous' */}
        <div
          className={`text-sm text-gray-500 flex gap-1.5 items-center flex-wrap`}
        >
          {!["xorY", "cityUserInput"].includes(modelName) &&
            !programDetail &&
            !userProfile && (
              <>
                {data.program?.city?.state}
                <div>·</div>
              </>
            )}
          {!userProfile && (
            <>
              <UserLink data={data} />
              <div>·</div>
            </>
          )}

          <div>{dayjs(data.createdAt).format("M/D/YYYY [at] ha")}</div>
          {/* Buttons for update and delete */}
          {!programDetail && !userProfile && (
            <div className={`ml-4 flex gap-4 items-center`}>
              {/* Details link is always visible */}
              <Upvote modelName={modelName} item={data} />
              {!detailsPage && (
                <Link
                  to={`/${modelName}/${data.id}/details`}
                  className={`text-sm underline`}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
