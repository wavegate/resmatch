import AddChatForm from "@/components/AddChatForm/AddChatForm";
import FilterTagSection from "@/components/FilterTagRow/FilterTagSection.tsx";
import { useCommentCategoryBadgeColor } from "@/hooks/useCommentCategoryBadgeColor.ts";
import { useFilterTagSection } from "@/hooks/useFilterTagSection.ts";
import useUser from "@/hooks/useUser";
import commentService from "@/services/commentService";
import {
  CommentCategory,
  mapCommentCategoryToLabel,
} from "@/typings/CommentTypes";
import {
  Badge,
  Button,
  Collapse,
  Loader,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import UserLink from "../UserLink";

interface CommentProps {
  id: number;
  queryKey: any;
  modelName?: string;
}

export default function Comment({
  postId,
  id,
  queryKey,
  modelName,
}: CommentProps) {
  const theme = useMantineTheme();
  const { mapCommentCategoryToBadgeColor } =
    useCommentCategoryBadgeColor(theme);
  const { selectedTagList, handleSelectTag } = useFilterTagSection({
    limitOneSelection: true,
  });
  const [replyOpened, setReplyOpened] = useState(false);
  const [repliesOpened, setRepliesOpened] = useState(false);
  const queryClient = useQueryClient();

  const toggleReplyForm = () => setReplyOpened((prev) => !prev);
  const toggleReplies = () => setRepliesOpened((prev) => !prev);
  const [editContent, setEditContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditMode = () => setIsEditing((prev) => !prev);

  const {
    data: comment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comment", id],
    queryFn: () => commentService.readComment(id),
  });

  useEffect(() => {
    if (comment) {
      setEditContent(comment.content);
      if (comment.category) {
        handleSelectTag(comment.category);
      }
    }
  }, [comment, handleSelectTag]);

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
      if (queryKey) {
        if (Array.isArray(queryKey) && Array.isArray(queryKey[0])) {
          for (let key of queryKey) {
            queryClient.invalidateQueries({ queryKey: key });
          }
        } else {
          queryClient.invalidateQueries({ queryKey });
        }
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

  const updateMutation = useMutation({
    mutationFn: (newContent: string) => {
      const payload = { content: newContent };
      if (selectedTagList.length > 0) {
        payload.category = selectedTagList[0];
      }
      return commentService.updateComment(id, payload);
    },
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Comment updated successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["comment", id] });
      setIsEditing(false); // Exit edit mode after successful update
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to update the comment",
        color: "red",
      });
    },
  });

  const handleSaveEdit = () => {
    updateMutation.mutate(editContent); // Trigger the update mutation with the edited content
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content); // Revert the edit content to original if cancelled
    setIsEditing(false); // Exit edit mode
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const { user } = useUser();

  if (isLoading) {
    return <Loader size="sm" />;
  }

  if (error) {
    return <Text>Error loading comment.</Text>;
  }
  //bump

  return (
    <div className={`border-solid border-l-2 pl-4`}>
      {comment && (
        <>
          <div className={`flex flex-col gap-2`}>
            <div
              className={`flex items-center flex-wrap text-gray-500 gap-x-2 text-xs sm:text-sm`}
            >
              <div className={`text-gray-900 font-medium`}>
                <UserLink data={comment} />
              </div>
              <div>•</div>
              <div>{dayjs(comment.createdAt).format("M/D/YYYY [at] ha")}</div>
              {comment.category && (
                <Badge color={mapCommentCategoryToBadgeColor[comment.category]}>
                  {mapCommentCategoryToLabel[comment.category]}
                </Badge>
              )}
            </div>
            {isEditing ? (
              <>
                {comment.parentId === null && comment.main === true && (
                  <FilterTagSection
                    sectionLabel={"Category:"}
                    tagList={Object.keys(CommentCategory)}
                    selectedTagList={selectedTagList}
                    handleSelectTag={handleSelectTag}
                    mapTagToLabel={mapCommentCategoryToLabel}
                    mapTagToBadgeColor={mapCommentCategoryToBadgeColor}
                  />
                )}
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.currentTarget.value)}
                  autosize
                  label={`Edit comment`}
                  size="md"
                  minRows={2}
                />
                <div className="flex gap-2">
                  <Button
                    size="compact-xs"
                    variant="outline"
                    onClick={handleSaveEdit}
                    loading={updateMutation.isPending}
                  >
                    Save Edit
                  </Button>
                  <Button
                    size="compact-xs"
                    variant="subtle"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <Text className="text-sm sm:text-sm md:text-md">
                {comment.content}
              </Text>
            )}
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {user && (
              <Button
                size="compact-xs"
                variant="subtle"
                onClick={toggleReplyForm}
              >
                {replyOpened ? "Cancel Reply" : "Reply"}
              </Button>
            )}
            {user?.id === comment.userId && (
              <>
                <Button
                  size="compact-xs"
                  variant="subtle"
                  onClick={toggleEditMode} // Toggle edit mode on click
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
                <Button
                  size="compact-xs"
                  variant="subtle"
                  color="red"
                  onClick={handleDelete}
                  loading={deleteMutation.isPending}
                >
                  Delete
                </Button>
              </>
            )}
            {comment.replies.length > 0 && (
              <Button
                variant="subtle"
                size="compact-xs"
                onClick={toggleReplies}
                rightSection={
                  repliesOpened ? <BsChevronUp /> : <BsChevronDown />
                }
              >
                {repliesOpened
                  ? "Hide Replies"
                  : `Show Replies (${comment.replies.length})`}
              </Button>
            )}
          </div>
          <Collapse in={replyOpened}>
            <AddChatForm
              postId={postId}
              modelName={modelName}
              parentComment={comment}
              parentId={id}
              setRepliesOpened={setRepliesOpened}
              setReplyOpened={setReplyOpened}
            />{" "}
            {/* Passing parentId to associate the reply */}
          </Collapse>
          <Collapse in={repliesOpened}>
            {repliesOpened && (
              <div className={`flex flex-col gap-4 mt-2`}>
                {comment.replies?.map((reply: any) => {
                  return (
                    <Comment
                      key={reply.id}
                      id={reply.id}
                      postId={postId}
                      queryKey={queryKey}
                      modelName={modelName}
                    />
                  );
                })}
              </div>
            )}
          </Collapse>
        </>
      )}
    </div>
  );
}
