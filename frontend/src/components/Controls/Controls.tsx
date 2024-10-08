import { Button, Pagination } from "@mantine/core";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";

interface ControlsProps {
  pageNum: number;
  setPageNum: (pageNum: number) => void;
  totalPages: number;
  openFilters: () => void;
  shareUrl: string;
  shareText: string;
}

export default function Controls({
  pageNum,
  setPageNum,
  totalPages,
  openFilters,
  shareUrl,
  shareText,
  noFilters,
  noShare,
}: ControlsProps) {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center gap-2 max-sm:items-start max-sm:flex-col max-sm:gap-4 mt-2`}
    >
      <div className={`flex gap-2 items-center`}>
        {!noFilters && (
          <Button onClick={openFilters} variant="outline">
            Filters
          </Button>
        )}
        {!noShare && (
          <Button
            className={`sm:hidden`}
            onClick={() => navigate(shareUrl)}
            leftSection={<IoMdAdd size={18} />}
          >
            {shareText}
          </Button>
        )}
        <Pagination
          className={`max-sm:hidden`}
          value={pageNum}
          onChange={setPageNum}
          total={totalPages}
        />
      </div>
      <div className={`flex gap-2`}>
        {!noShare && (
          <Button
            className={`max-sm:hidden`}
            onClick={() => navigate(shareUrl)}
            leftSection={<IoMdAdd size={18} />}
          >
            {shareText}
          </Button>
        )}
        <Pagination
          className={`sm:hidden`}
          value={pageNum}
          onChange={setPageNum}
          total={totalPages}
          boundaries={0}
        />
      </div>
    </div>
  );
}
