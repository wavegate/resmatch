import { Accordion } from "@mantine/core";
import CommentHeader from "@/headers/CommentHeader/CommentHeader";

export default function CommentDetails({ item }) {
  return (
    <div>
      {item.replies?.length > 0 &&
        item.replies.map((reply) => (
          <div>
            <CommentHeader item={reply} />
            <CommentDetails item={reply} />
          </div>
        ))}
    </div>
  );
}
