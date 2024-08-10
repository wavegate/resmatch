import { Button, Pagination } from "@mantine/core";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

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
  const { user } = useUser();
  const navigate = useNavigate();

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
        {user && (
          <Button
            className={`max-sm:hidden`}
            onClick={() => {
              navigate("/program/add");
            }}
            leftSection={<IoMdAdd size={18} />}
          >
            Add Program
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