import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import questionService from "@/services/questionService";
import { notifications } from "@mantine/notifications";

export default function QuestionDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => questionService.deleteQuestion(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Question deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["question"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the question",
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div>
      <Group justify="apart">
        <Link to={`/question/${item.id}`}>
          <Button>Update Question</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Question
        </Button>
      </Group>
      <Text>
        <strong>Program:</strong> {item.program.name}
      </Text>
      <Text>
        <strong>Questions:</strong>
      </Text>
      <ul>
        {item.questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
}
