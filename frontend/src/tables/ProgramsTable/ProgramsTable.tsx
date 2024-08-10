import inviteService from "@/services/inviteService";
import {
  Button,
  Pagination,
  Accordion,
  Avatar,
  Drawer,
  Text,
  Loader,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState, useMemo } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "@/constants";
import useUser from "@/hooks/useUser";
import NoRecords from "@/components/NoRecords/NoRecords";
import ItemDetails from "@/components/InviteDetails/InviteDetails";
import programService from "@/services/programService";
import ProgramDetails from "@/details/ProgramDetails/ProgramDetails";
import ProgramFilters from "@/filters/ProgramFilters/ProgramFilters";

interface InvitesTableProps {
  className?: string;
}

export default ({ className }: InvitesTableProps) => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["programs", searchTerm, pageNum],
    queryFn: () => {
      return programService.searchProgram({
        searchTerm,
        pageNum,
      });
    },
  });

  const clearFilters = () => {
    setSearchTerm("");
    setPageNum(1);
  };

  const items = useMemo(() => {
    if (data) {
      return data.programs?.map((item: any) => {
        return (
          <Accordion.Item key={item.id} value={item.id.toString()}>
            <Accordion.Control className={`pl-0`}>
              <div>
                {item.name} at {item.institution.name}
              </div>
              {item.image && <img src={item.image}></img>}
            </Accordion.Control>
            <Accordion.Panel>
              <ProgramDetails item={item} />
            </Accordion.Panel>
          </Accordion.Item>
        );
      });
    }
  }, [data]);

  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const totalPages = useMemo(() => {
    if (data) {
      const totalCount = data?.totalCount || 0;
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);
      return totalPages;
    }
  }, [data?.totalCount]);

  const filtersPresent = useMemo(() => {
    return false;
  }, []);

  return (
    <div className={`${className}`}>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <ProgramFilters
          opened={opened}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
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
        </div>
      )}
      <div className={`mt-2`}>
        {isLoading && (
          <div className={`flex flex-col items-center`}>
            <Loader color="blue" className={`mt-12`} />
          </div>
        )}
        {data?.programs?.length > 0 && <Accordion>{items}</Accordion>}
        {data?.programs && data.programs.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
