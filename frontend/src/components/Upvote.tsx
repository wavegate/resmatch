import { Badge } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import useUser from "@/hooks/useUser"; // Assuming you have this hook for user data
import services from "@/services/services";
import { pageDescription } from "@/schemas/pageDescription";

interface UpvoteProps {
  modelName: string; // The name of the model, e.g., "interviewInvite"
  item: {
    id: number; // The ID of the item to upvote
    upvotedUsers: { id: number }[]; // List of users who have upvoted
  };
}

export default ({ modelName, item }: UpvoteProps) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  // Check if the user has upvoted this item based on the upvotedUsers array
  const isUpvoted = item.upvotedUsers.some((u) => u.id === user?.id);

  // Calculate the number of upvotes based on the length of the upvotedUsers array
  const upvotesCount = item.upvotedUsers.length;

  // Mutation to upvote or remove upvote
  const upvoteMutation = useMutation({
    mutationFn: (isUpvoting: boolean) => {
      return services[modelName].upvote(item.id, isUpvoting);
    },
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: `${pageDescription[modelName].singular} ${
          isUpvoted ? "unvoted" : "upvoted"
        } successfully`,
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: [modelName] });
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error",
        message: `Failed to ${isUpvoted ? "unvote" : "upvote"} the item`,
        color: "red",
      });
    },
  });

  // Handle button click for toggling upvote
  const handleButtonClick = () => {
    if (!upvoteMutation.isPending) {
      upvoteMutation.mutate(!isUpvoted); // Toggle upvote status
    }
  };

  // Show number of upvotes as +1, +2, etc.
  const displayUpvotes = upvotesCount > 0 ? `+${upvotesCount}` : "0";

  return (
    <>
      {user ? (
        <Badge
          color="gray"
          onClick={handleButtonClick}
          variant={isUpvoted ? "filled" : "outline"}
          className={`hover:cursor-pointer font-semibold flex-shrink-0`}
        >
          {displayUpvotes}
        </Badge>
      ) : (
        <Badge
          color="gray"
          className={`font-semibold flex-shrink-0`}
          variant={"outline"}
        >
          {displayUpvotes}
        </Badge> // Display 0 if no user is logged in
      )}
    </>
  );
};
