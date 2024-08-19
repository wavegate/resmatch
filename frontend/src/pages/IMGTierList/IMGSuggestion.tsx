import useUser from "@/hooks/useUser";
import suggestionService from "@/services/suggestionService";
import { Button, Text, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Suggestion = ({ suggestion }) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(suggestion.content);

  // Mutation to delete a suggestion
  const { mutate: deleteSuggestion } = useMutation({
    mutationFn: (suggestionId) =>
      suggestionService.deleteSuggestion(suggestionId),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Suggestion deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["suggestion", 2] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete suggestion",
        color: "red",
      });
    },
  });

  // Mutation to update a suggestion
  const { mutate: updateSuggestion, isLoading: isUpdating } = useMutation({
    mutationFn: ({ suggestionId, newContent }) =>
      suggestionService.updateSuggestion(suggestionId, { content: newContent }),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Suggestion updated successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["suggestion", 1] });
      setIsEditing(false);
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to update suggestion",
        color: "red",
      });
    },
  });

  const handleSaveEdit = () => {
    updateSuggestion({ suggestionId: suggestion.id, newContent: editContent });
  };

  const handleCancelEdit = () => {
    setEditContent(suggestion.content);
    setIsEditing(false);
  };

  return (
    <li key={suggestion.id}>
      {isEditing ? (
        <>
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.currentTarget.value)}
            autosize
            minRows={2}
          />
          <div className="flex gap-2 mt-2">
            <Button
              size="xs"
              variant="subtle"
              onClick={handleSaveEdit}
              loading={isUpdating}
            >
              Save
            </Button>
            <Button size="xs" variant="subtle" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <Text className={`inline`}>{suggestion.content}</Text>
          {suggestion.userId === user?.id && (
            <div className="flex gap-2 mt-2">
              <Button
                onClick={() => setIsEditing(true)}
                variant="subtle"
                size="xs"
              >
                Edit
              </Button>
              <Button
                onClick={() => deleteSuggestion(suggestion.id)}
                color="red"
                size="xs"
              >
                Delete
              </Button>
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default Suggestion;
