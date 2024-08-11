import { Accordion, Text, Button, Collapse, Loader } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import commentService from "@/services/commentService";
import AddChatForm from "@/components/AddChatForm/AddChatForm";

interface CommentHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function CommentHeader({ item }: CommentHeaderProps) {
  const [replyOpened, setReplyOpened] = useState(false);
  const [repliesOpened, setRepliesOpened] = useState(false);
  const queryClient = useQueryClient();

  const toggleReplyForm = () => setReplyOpened((prev) => !prev);
  const toggleReplies = () => setRepliesOpened((prev) => !prev);

  const {
    data: comment,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comment", item.id],
    queryFn: () => commentService.readComment(item.id),
    enabled: false, // Only fetch when the collapse is opened
  });

  const deleteMutation = useMutation({
    mutationFn: () => commentService.deleteComment(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Comment deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the comment",
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleToggleReplies = async () => {
    if (!repliesOpened) {
      await refetch();
    }
    toggleReplies();
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {item.content}
        </Text>
        <Button
          variant="subtle"
          size="xs"
          onClick={handleToggleReplies}
          rightIcon={repliesOpened ? <BsChevronUp /> : <BsChevronDown />}
        >
          {repliesOpened ? "Hide Replies" : "Show Replies"}
        </Button>
      </div>
      <div className={`flex items-center gap-2`}>
        {item.user ? (
          <Link to={`/user/${item.user.id}`}>
            <Text c="dimmed" className="text-xs sm:text-sm underline">
              {item.user.alias}
            </Text>
          </Link>
        ) : (
          <Text c="dimmed" className="text-xs sm:text-sm">
            Anonymous
          </Text>
        )}
        <Text c="dimmed" className="text-xs sm:text-sm">
          {dayjs(item.createdAt).format("MMM D, YYYY")}
        </Text>
      </div>
      <div className="flex gap-2">
        <Button size="xs" variant="subtle" onClick={toggleReplyForm}>
          {replyOpened ? "Cancel Reply" : "Reply"}
        </Button>
        <Button
          size="xs"
          variant="subtle"
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete
        </Button>
      </div>
      <Collapse in={replyOpened}>
        <AddChatForm parentId={item.id} />{" "}
        {/* Passing parentId to associate the reply */}
      </Collapse>
      <Collapse in={repliesOpened}>
        {isLoading ? (
          <Loader size="sm" />
        ) : (
          comment &&
          comment.replies?.map((reply: any) => <CommentHeader item={reply} />)
        )}
      </Collapse>
    </div>
  );
}
