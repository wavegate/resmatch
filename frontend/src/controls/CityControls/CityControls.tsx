import { Button, Pagination } from "@mantine/core";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";

export default function CityControls({
  pageNum,
  setPageNum,
  totalPages,
  openFilters,
}) {
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
        {user && (
          <Button
            className={`sm:hidden`}
            onClick={() => {
              navigate("/city/add");
            }}
            leftSection={<IoMdAdd size={18} />}
          >
            Share City
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
        {user && (
          <Button
            className={`max-sm:hidden`}
            onClick={() => {
              navigate("/city/add");
            }}
            leftSection={<IoMdAdd size={18} />}
          >
            Add City
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
