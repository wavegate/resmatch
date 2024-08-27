import { Button, Pagination } from "@mantine/core";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface ProgramControlsProps {
  pageNum: number;
  setPageNum: (pageNum: number) => void;
  totalPages: number | undefined;
  openFilters: () => void;
}

export default function ProgramControls({
  pageNum,
  setPageNum,
  totalPages,
  openFilters,
}: ProgramControlsProps) {
  return (
    <div
      className={`flex items-center gap-2 max-sm:items-start max-sm:flex-col max-sm:gap-4`}
    >
      <div className={`flex gap-2 items-center`}>
        <Button onClick={openFilters} variant="outline">
          Filters
        </Button>

        <Pagination
          className={`max-sm:hidden`}
          value={pageNum}
          onChange={setPageNum}
          total={totalPages}
        />
      </div>
      <div className={`flex gap-2`}>
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
