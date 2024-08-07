import userService from "@/services/userService";
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
import { Link, useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "@/constants";
import useUser from "@/hooks/useUser";
import NoRecords from "@/components/NoRecords/NoRecords";
import Filters from "./Filters/Filters";

interface UsersTableProps {
  className?: string;
}

export default ({ className }: UsersTableProps) => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["users", searchTerm, pageNum],
    queryFn: () => {
      return userService.searchUser({
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
      return data.users?.map((item: any) => (
        <Accordion.Item key={item.id} value={item.id.toString()}>
          <Accordion.Control className="pl-0">
            <div>{item.alias}</div>
          </Accordion.Control>
          <Accordion.Panel>
            <Link to={`/user/${item.id}`}>
              <Button variant="outline" size="sm">
                Update Applicant
              </Button>
            </Link>
          </Accordion.Panel>
        </Accordion.Item>
      ));
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
        <Filters
          opened={opened}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          clearFilters={clearFilters}
        />
      </Drawer>
      <div className="flex items-center gap-2 max-sm:items-start max-sm:flex-col max-sm:gap-4">
        <div className="flex gap-2 items-center">
          <Button onClick={open} variant="outline">
            Filters
          </Button>
          {user && (
            <Button
              className="sm:hidden"
              onClick={() => {
                navigate("/user/add");
              }}
              leftSection={<IoMdAdd size={18} />}
            >
              Add User
            </Button>
          )}
          <Pagination
            className="max-sm:hidden"
            value={pageNum}
            onChange={setPageNum}
            total={totalPages}
          />
        </div>
        <div className="flex gap-2">
          {user && (
            <Button
              className="max-sm:hidden"
              onClick={() => {
                navigate("/user/add");
              }}
              leftSection={<IoMdAdd size={18} />}
            >
              Add User
            </Button>
          )}
          <Pagination
            className="sm:hidden"
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
              rightSection={<IoMdClose onClick={() => setSearchTerm("")} />}
            >
              {`${searchTerm}`}
            </Badge>
          )}
        </div>
      )}
      <div className="mt-2">
        {isLoading && (
          <div className="flex flex-col items-center">
            <Loader color="blue" className="mt-12" />
          </div>
        )}
        {data?.users?.length > 0 && <Accordion>{items}</Accordion>}
        {data?.users && data.users.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
