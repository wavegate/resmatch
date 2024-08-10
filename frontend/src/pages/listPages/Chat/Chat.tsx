import React, { useState } from "react";
import { Container, Group, Text, Button, Title, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import threadService from "@/services/threadService";
import CreateThreadDrawer from "@/components/CreateThreadDrawer/CreateThreadDrawer";
import ThreadCard from "@/components/ThreadCard/ThreadCard";
import useUser from "@/hooks/useUser";

const ChatPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useUser();
  const pageNum = 1;

  const {
    data: threads,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["threads", pageNum],
    queryFn: () => threadService.searchThread({ pageNum }),
  });

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <Container size="md" p="md">
      <Group justify="apart" mb="md">
        <Title order={2}>Community Chat</Title>
        {user && <Button onClick={openDrawer}>New Thread</Button>}
      </Group>

      {isLoading && <Text>Loading threads...</Text>}
      {error && <Text c="red">Error loading threads</Text>}

      <Stack justify="lg">
        {threads?.threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </Stack>

      <CreateThreadDrawer opened={drawerOpen} onClose={closeDrawer} />
    </Container>
  );
};

export default ChatPage;
