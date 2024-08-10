import { Text, Group, Badge } from "@mantine/core";

const FameShameDetails = ({ item }) => {
  return (
    <div>
      <Group justify="apart">
        <Text size="lg">{item.program.name}</Text>
        <Badge color="green">{item.fame}</Badge>
        <Badge color="red">{item.shame}</Badge>
      </Group>
      <Text mt="md" c="dimmed">
        Submitted by: {item.user.alias}
      </Text>
    </div>
  );
};

export default FameShameDetails;
