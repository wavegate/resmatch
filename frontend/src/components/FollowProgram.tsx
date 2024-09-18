import { Badge } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import userService from "@/services/userService";
import useUser from "@/hooks/useUser";

interface FollowProgramProps {
  programId: number; // Program's ID
}

export default ({ programId }: FollowProgramProps) => {
  const { user, refetch } = useUser();
  const isFollowed = user?.followedPrograms?.some((x) => x.id === programId);

  // Mutation to follow or unfollow a program
  const followMutation = useMutation({
    mutationFn: (isFollowing: boolean) => {
      return userService.updateUser(user?.id, {
        ...(isFollowing
          ? { programIdToAdd: programId }
          : { programIdToRemove: programId }),
      });
    },
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: `Program ${
          isFollowed ? "unfollowed" : "followed"
        } successfully`,
        color: "green",
      });

      refetch();
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error",
        message: `Failed to ${isFollowed ? "unfollow" : "follow"} the program`,
        color: "red",
      });
    },
  });

  const handleButtonClick = () => {
    if (!followMutation.isPending) {
      followMutation.mutate(!isFollowed);
    }
  };

  return (
    <>
      {user ? (
        <Badge
          color="gray"
          onClick={handleButtonClick}
          variant={isFollowed ? "filled" : "outline"}
          className={`hover:cursor-pointer font-semibold`}
        >
          {isFollowed ? "Following" : "Follow"}
        </Badge>
      ) : (
        false
      )}
    </>
  );
};
