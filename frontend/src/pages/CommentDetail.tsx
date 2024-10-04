import { Link, useParams } from "react-router-dom";
import Comment from "@/components/Comment/Comment";
import { Button } from "@mantine/core";
import commentService from "@/services/commentService";
import { useQuery } from "@tanstack/react-query";
import { FaArrowUp } from "react-icons/fa";

const CommentDetail = () => {
  const { id } = useParams();
  const {
    data: comment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comment", id],
    queryFn: () => commentService.readComment(id),
    retry: false,
  });

  return (
    <div className={`flex flex-col gap-4`}>
      <h3 className={`text-lg font-medium`}>Comment thread</h3>
      {comment?.topLevelParentId && (
        <Link to={`/comment/${comment?.topLevelParentId}`} className={`w-fit`}>
          <Button leftSection={<FaArrowUp />} variant="light">
            View entire thread
          </Button>
        </Link>
      )}
      <Comment id={id} showAllReplies></Comment>
    </div>
  );
};

export default CommentDetail;
