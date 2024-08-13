import CommentHeader from "@/headers/CommentHeader/CommentHeader";
import { Accordion, Text, Button, Group } from "@mantine/core";
import CommentDetails from "../CommentDetails/CommentDetails";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import xOrYService from "@/services/xOrYService";

interface XorYDetailsProps {
  item: any; // Replace with the correct type if available
}

export default function XorYDetails({ item }: XorYDetailsProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => xOrYService.deleteXorY(item.id),
    onSuccess: () => {
      notifications.show({
        message: "Comparison deleted successfully!",
        withBorder: true,
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: [item.img ? "xOrY-img" : "xOrY"],
      });
    },
    onError: () => {
      notifications.show({
        message: "Failed to delete comparison.",
        withBorder: true,
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-2">
      <Text className="text-sm sm:text-md md:text-lg font-medium">
        Comparison Details
      </Text>
      <div className="flex flex-col gap-1">
        <Text>
          <strong>Program X:</strong> {item.programX.name} at{" "}
          {item.programX.institution.name}
        </Text>
        <Text>
          <strong>Program Y:</strong> {item.programY.name} at{" "}
          {item.programY.institution.name}
        </Text>
        <Text>
          <strong>Question:</strong> {item.question}
        </Text>
      </div>

      <Group justify="apart" className="mt-4">
        <Link to={item.img ? `/x-or-y-img/${item.id}` : `/x-or-y/${item.id}`}>
          <Button variant="outline" size="xs">
            Update Comparison
          </Button>
        </Link>
        <Button variant="outline" size="xs" color="red" onClick={handleDelete}>
          Delete Comparison
        </Button>
      </Group>

      <div className="mt-4">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          Comments
        </Text>
        {/* Uncomment when comments are available */}
        {/* <Accordion>
          {item.comments.map((comment: any) => (
            <Accordion.Item key={comment.id} value={comment.id.toString()}>
              <CommentHeader item={comment} />
              <Accordion.Panel>
                <CommentDetails item={comment} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion> */}
      </div>
    </div>
  );
}
