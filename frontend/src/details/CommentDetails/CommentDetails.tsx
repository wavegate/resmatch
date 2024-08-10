import { Accordion } from "@mantine/core";
import CommentHeader from "@/headers/CommentHeader/CommentHeader";

export default function CommentDetails({ item }) {
  return (
    <div>
      {item.replies?.length > 0 && (
        <Accordion>
          {item.replies.map((reply) => (
            <Accordion.Item key={reply.id} value={reply.id.toString()}>
              <CommentHeader item={reply} />
              <CommentDetails item={reply} />
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
}
