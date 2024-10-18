import { Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import { PAGE_SIZE } from "@/constants";
import Controls from "@/components/Controls/Controls";
import commentService from "@/services/commentService";
import Comment from "@/components/Comment/Comment";
import { CommentCategory } from "@/typings/CommentTypes";

interface ChatTableProps {
  className?: string;
  selectedCommentCategories: CommentCategory[];
}

export default ({
  className,
  selectedCommentCategories,
  searchValue,
  pageNum,
  setPageNum,
}: ChatTableProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [
      "main",
      pageNum,
      JSON.stringify(selectedCommentCategories),
      searchValue,
    ],
    queryFn: () => {
      return commentService.searchComment({
        pageNum,
        main: true,
        selectedCommentCategories,
        searchValue,
      });
    },
  });

  const totalPages = useMemo(() => {
    if (data) {
      const totalCount = data?.totalCount || 0;
      return Math.ceil(totalCount / PAGE_SIZE);
    }
  }, [data?.totalCount]);

  return (
    <div className={`${className}`}>
      <Controls
        noFilters
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPages={totalPages}
        shareUrl="/chat/add"
        shareText="New Thread"
      />

      <div className={`mt-6`}>
        {isLoading && (
          <div className={`flex flex-col items-center`}>
            <Loader color="blue" className={`mt-12`} />
          </div>
        )}
        {data?.comments?.length > 0 && (
          <div className={`flex flex-col gap-4`}>
            {data.comments.map((item: any) => (
              <Comment id={item.id} key={item.id} />
            ))}
          </div>
        )}
        {data?.comments && data.comments.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
