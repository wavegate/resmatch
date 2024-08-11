import { Accordion, Loader, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import commentService from "@/services/commentService";
import CommentHeader from "@/headers/CommentHeader/CommentHeader";
import CommentDetails from "@/details/CommentDetails/CommentDetails";
import NoRecords from "@/components/NoRecords/NoRecords";
import { PAGE_SIZE } from "@/constants";

interface ModReportTableProps {
  className?: string;
}

export default function ModReportTable({ className }: ModReportTableProps) {
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["modReports", pageNum],
    queryFn: () => {
      return commentService.searchComment({
        report: true,
        pageNum,
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
      <div className={`flex items-center justify-between mb-4`}>
        <Pagination value={pageNum} onChange={setPageNum} total={totalPages} />
      </div>
      <div className={`mt-2`}>
        {isLoading && (
          <div className={`flex flex-col items-center`}>
            <Loader color="blue" className={`mt-12`} />
          </div>
        )}
        {data?.comments?.length > 0 && (
          <Accordion>
            {data.comments.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id.toString()}>
                <CommentHeader item={item} />
                <CommentDetails item={item} />
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        {data?.comments && data.comments.length === 0 && <NoRecords />}
      </div>
    </div>
  );
}
