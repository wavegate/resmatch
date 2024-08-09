import React, { useState } from "react";
import {
  Card,
  Group,
  Text,
  Button,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import replyService from "@/services/replyService";
import useUser from "@/hooks/useUser";

const ThreadCard = ({ thread }) => {
  const { user } = useUser();
  const [replyFormVisible, setReplyFormVisible] = useState(false);
  const queryClient = useQueryClient();

  const toggleReplyForm = () => {
    setReplyFormVisible(!replyFormVisible);
  };

  const handleReplySubmit = async (threadId, content) => {
    await mutateAsync({ threadId, content });
  };

  const { mutateAsync } = useMutation({
    mutationFn: ({ threadId, content }) =>
      replyService.createReply(threadId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries(["threads"]);
      setReplyFormVisible(false);
    },
  });

  return (
    <Card shadow="sm" p="lg">
      <Group justify="apart" mb="xs">
        <Title order={4}>{thread.title}</Title>
        <Text size="sm" c="dimmed">
          By {thread.user.alias} on{" "}
          {new Date(thread.createdAt).toLocaleDateString()}
        </Text>
      </Group>
      <Text>{thread.content}</Text>

      <Stack justify="xs" mt="md">
        {thread.replies.map((reply) => (
          <Card key={reply.id} shadow="sm" p="md">
            <Text size="sm" c="dimmed">
              By {reply.user.alias} on{" "}
              {new Date(reply.createdAt).toLocaleDateString()}
            </Text>
            <Text>{reply.content}</Text>
          </Card>
        ))}
      </Stack>

      {user && (
        <Button onClick={toggleReplyForm}>
          {replyFormVisible ? "Cancel Reply" : "Reply"}
        </Button>
      )}

      {replyFormVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const content = formData.get("replyContent");
            handleReplySubmit(thread.id, content);
          }}
        >
          <Textarea
            name="replyContent"
            placeholder="Write your reply here..."
            required
            minRows={3}
            mb="sm"
          />
          <Button type="submit">Submit Reply</Button>
        </form>
      )}
    </Card>
  );
};

export default ThreadCard;
