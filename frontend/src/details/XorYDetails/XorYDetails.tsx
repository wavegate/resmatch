import CommentHeader from "@/headers/CommentHeader/CommentHeader";
import { Accordion, Text } from "@mantine/core";
import CommentDetails from "../CommentDetails/CommentDetails";

interface XorYDetailsProps {
  item: any; // Replace with the correct type if available
}

export default function XorYDetails({ item }: XorYDetailsProps) {
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
      <div className="mt-4">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          Comments
        </Text>
        <Accordion>
          {item.comments.map((comment: any) => (
            <Accordion.Item key={comment.id} value={comment.id.toString()}>
              <CommentHeader item={comment} />
              <Accordion.Panel>
                <CommentDetails item={comment} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
