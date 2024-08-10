import {
  Button,
  Pagination,
  Accordion,
  Drawer,
  Text,
  Loader,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { PAGE_SIZE } from "@/constants";
import useUser from "@/hooks/useUser";
import NoRecords from "@/components/NoRecords/NoRecords";
import fameShameService from "@/services/fameShameService";
import { useNavigate } from "react-router-dom";
import FameShameDetails from "@/details/FameShameDetails/FameShameDetails";
import FameShameFilters from "@/filters/FameShameFilters/FameShameFilters";

interface FameShameTableProps {
  className?: string;
}

export default ({ className }: FameShameTableProps) => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [programId, setProgramId] = useState<number | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["fameShameEntries", searchTerm, pageNum, programId],
    queryFn: () => {
      return fameShameService.searchFameShame({
        searchTerm,
        pageNum,
        programId,
      });
    },
  });

  const clearFilters = () => {
    setSearchTerm("");
    setProgramId(null);
    setPageNum(1);
  };

  const items = useMemo(() => {
    if (data) {
      return data.fameShameInputs?.map((item: any) => (
        <Accordion.Item key={item.id} value={item.id.toString()}>
          <Accordion.Control className={`pl-0`}>
            <div>
              {item.program.name} - {item.fame}/{item.shame}
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <FameShameDetails item={item} />
          </Accordion.Panel>
        </Accordion.Item>
      ));
    }
  }, [data]);

  const [opened, { open, close }] = useDisclosure(false);

  const totalPages = useMemo(() => {
    if (data) {
      const totalCount = data?.totalCount || 0;
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);
      return totalPages;
    }
  }, [data?.totalCount]);

  const filtersPresent = useMemo(() => {
    return searchTerm || programId;
  }, [searchTerm, programId]);

  const navigate = useNavigate();

  return (
    <div className={`${className}`}>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <FameShameFilters
          opened={opened}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setProgramId={setProgramId}
          clearFilters={clearFilters}
        />
      </Drawer>
      <div
        className={`flex items-center gap-2 max-sm:items-start max-sm:flex-col max-sm:gap-4`}
      >
        <div className={`flex gap-2 items-center`}>
          <Button onClick={open} variant="outline">
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
                navigate("/fame-shame/add");
              }}
              leftSection={<IoMdAdd size={18} />}
            >
              Add Fame/Shame
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
      {filtersPresent && (
        <div className="inline-flex gap-1 mt-2">
          {searchTerm && (
            <Badge
              rightSection={<IoMdClose onClick={() => setSearchTerm(null)} />}
            >
              {`${searchTerm}`}
            </Badge>
          )}
          {programId && (
            <Badge
              rightSection={<IoMdClose onClick={() => setProgramId(null)} />}
            >
              {`Program ID: ${programId}`}
            </Badge>
          )}
        </div>
      )}
      <div className={`mt-2`}>
        {isLoading && (
          <div className={`flex flex-col items-center`}>
            <Loader color="blue" className={`mt-12`} />
          </div>
        )}
        {data?.fameShameInputs?.length > 0 && <Accordion>{items}</Accordion>}
        {data?.fameShameInputs && data.fameShameInputs.length === 0 && (
          <NoRecords />
        )}
      </div>
    </div>
  );
};
