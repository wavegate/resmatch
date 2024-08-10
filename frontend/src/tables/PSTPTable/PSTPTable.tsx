import { Accordion, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import commentService from "@/services/commentService";
import CommentHeader from "@/headers/CommentHeader/CommentHeader";
import CommentDetails from "@/details/CommentDetails/CommentDetails";
import NoRecords from "@/components/NoRecords/NoRecords";
import { PAGE_SIZE } from "@/constants";

interface PSTPTableProps {
  className?: string;
}

export default ({ className }: PSTPTableProps) => {
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["pstp-comments", pageNum],
    queryFn: () => commentService.searchComment({ pstp: true, pageNum }),
  });

  const totalPages = useMemo(() => {
    if (data) {
      const totalCount = data?.totalCount || 0;
      return Math.ceil(totalCount / PAGE_SIZE);
    }
  }, [data?.totalCount]);

  const items = useMemo(() => {
    if (data) {
      return data.comments.map((comment: any) => (
        <Accordion.Item key={comment.id} value={comment.id.toString()}>
          <CommentHeader item={comment} />
          <CommentDetails item={comment} />
        </Accordion.Item>
      ));
    }
  }, [data]);

  return (
    <div className={className}>
      {isLoading && (
        <div className="flex flex-col items-center">
          <Loader color="blue" className="mt-12" />
        </div>
      )}
      {data?.comments?.length > 0 && <Accordion>{items}</Accordion>}
      {data?.comments && data.comments.length === 0 && <NoRecords />}
    </div>
  );
};
