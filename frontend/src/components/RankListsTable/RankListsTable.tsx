import rankListService from "@/services/rankListService";
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

interface RankListsTableProps {
  className?: string;
}

export default ({ className }: RankListsTableProps) => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["ranklist", searchTerm, pageNum],
    queryFn: () => {
      return rankListService.searchRankList({
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
      return data.rankLists?.map((rankList: any) => (
        <Accordion.Item key={rankList.id} value={rankList.id.toString()}>
          <Accordion.Control className={`pl-0`}>
            <div className="grid grid-cols-[80px,1fr] gap-4">
              <div className="flex flex-col gap-1">
                <Text className="text-sm sm:text-md md:text-lg font-medium">
                  Rank List #{rankList.id}
                </Text>
                <div className="flex items-center gap-2">
                  <Text className="text-xs sm:text-sm">
                    <strong>Graduate Type:</strong>{" "}
                    {rankList.graduateType || "N/A"}
                  </Text>
                  <Text className="text-xs sm:text-sm">
                    <strong>Programs Applied:</strong>{" "}
                    {rankList.numberOfProgramsApplied || "N/A"}
                  </Text>
                  <Text className="text-xs sm:text-sm">
                    <strong>Invites:</strong>{" "}
                    {rankList.numberOfInvites || "N/A"}
                  </Text>
                  <Text className="text-xs sm:text-sm">
                    <strong>Interviews Attended:</strong>{" "}
                    {rankList.numberOfInterviewsAttended || "N/A"}
                  </Text>
                </div>
              </div>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Link to={`/ranklist/${rankList.id}`}>
              <Button variant="outline" size="sm">
                View Rank List
              </Button>
            </Link>
            <div className="flex flex-col gap-4 mt-4">
              <Text>
                <strong>Why #1:</strong> {rankList.whyNumberOne || "N/A"}
              </Text>
              <Text>
                <strong>Prioritizes When Ranking:</strong>{" "}
                {rankList.prioritizesWhenRanking || "N/A"}
              </Text>
              <Text>
                <strong>Hardest Part of Ranking:</strong>{" "}
                {rankList.hardestPartOfRanking || "N/A"}
              </Text>
              <Text>
                <strong>Matched Program:</strong>{" "}
                {rankList.matchedProgram?.name || "N/A"}
              </Text>
              <Text>
                <strong>Done with Interviews:</strong>{" "}
                {rankList.doneWithInterviews ? "Yes" : "No"}
              </Text>
            </div>
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
                navigate("/rank-list/add");
              }}
              leftSection={<IoMdAdd size={18} />}
            >
              Add Rank List
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
                navigate("/rank-list/add");
              }}
              leftSection={<IoMdAdd size={18} />}
            >
              Add Rank List
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
        {data?.rankLists?.length > 0 && <Accordion>{items}</Accordion>}
        {data?.rankLists && data.rankLists.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
