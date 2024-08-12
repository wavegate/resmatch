import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Text, Button, Collapse, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import commentService from "@/services/commentService";
import AddChatForm from "@/components/AddChatForm/AddChatForm";
import { notifications } from "@mantine/notifications";

interface CommentProps {
  id: number;
}

export default function Comment({ id }: CommentProps) {
  const [replyOpened, setReplyOpened] = useState(false);
  const [repliesOpened, setRepliesOpened] = useState(false);
  const queryClient = useQueryClient();

  const toggleReplyForm = () => setReplyOpened((prev) => !prev);
  const toggleReplies = () => setRepliesOpened((prev) => !prev);

  const {
    data: comment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comment", id],
    queryFn: () => commentService.readComment(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => commentService.deleteComment(id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Comment deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: ["comment", comment.parentId],
      });
      if (comment.main && !comment.parentId) {
        queryClient.invalidateQueries({
          queryKey: ["chat"],
        });
      }
      if (comment.pstp && !comment.parentId) {
        queryClient.invalidateQueries({
          queryKey: ["pstp"],
        });
      }
      if (comment.report && !comment.parentId) {
        queryClient.invalidateQueries({
          queryKey: ["report"],
        });
      }
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

  if (isLoading) {
    return <Loader size="sm" />;
  }

  if (error) {
    return <Text>Error loading comment.</Text>;
  }

  return (
    <div className={`border-solid border-l-2 pl-4`}>
      {comment && (
        <>
          <Text className="text-xs sm:text-sm md:text-md font-medium">
            {comment.content}
          </Text>

          <div className={`flex items-center gap-2`}>
            {comment.user && (
              <Link to={`/user/${comment.user.id}`}>
                <Text c="dimmed" className="text-xs sm:text-sm underline">
                  {comment.user.alias}
                </Text>
              </Link>
            )}
            <Text c="dimmed" className="text-xs sm:text-sm">
              {dayjs(comment.createdAt).format("MMM D, YYYY")}
            </Text>
          </div>

          <div className="flex gap-2 mt-2">
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
            {comment.replies.length > 0 && (
              <Button
                variant="subtle"
                size="xs"
                onClick={toggleReplies}
                rightIcon={repliesOpened ? <BsChevronUp /> : <BsChevronDown />}
              >
                {repliesOpened ? "Hide Replies" : "Show Replies"}
              </Button>
            )}
          </div>
          <Collapse in={replyOpened}>
            <AddChatForm
              parentId={id}
              setRepliesOpened={setRepliesOpened}
              setReplyOpened={setReplyOpened}
            />{" "}
            {/* Passing parentId to associate the reply */}
          </Collapse>
          <Collapse in={repliesOpened}>
            {repliesOpened && (
              <div className={`flex flex-col gap-4`}>
                {comment.replies?.map((reply: any) => {
                  return <Comment key={reply.id} id={reply.id} />;
                })}
              </div>
            )}
          </Collapse>
        </>
      )}
    </div>
  );
}