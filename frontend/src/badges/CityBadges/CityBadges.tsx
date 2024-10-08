import cityService from "@/services/cityService";
import {
  Button,
  Pagination,
  Accordion,
  Text,
  Loader,
  Badge,
  Drawer,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "@/constants";
import NoRecords from "@/components/NoRecords/NoRecords";
import CityDetails from "@/details/CityDetails/CityDetails";
import CityFilters from "@/filters/CityFilters/CityFilters";

interface CitiesTableProps {
  className?: string;
}

export default ({ className }: CitiesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["cities", searchTerm, pageNum],
    queryFn: () => {
      return cityService.searchCity({
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
      return data.cities?.map((item: any) => {
        return (
          <Accordion.Item key={item.id} value={item.id.toString()}>
            <Accordion.Control className={`pl-0`}>
              <div className="flex items-center">
                <Text className="font-medium">{item.name}</Text>
                <Text className="ml-2 text-gray-500">{item.state}</Text>
              </div>
            </Accordion.Control>
            <Accordion.Panel>
              <CityDetails item={item} />
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
    return !!searchTerm;
  }, [searchTerm]);

  return (
    <div className={`${className}`}>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <CityFilters
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
              rightSection={<IoMdClose onClick={() => setSearchTerm("")} />}
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
        {data?.cities?.length > 0 && <Accordion>{items}</Accordion>}
        {data?.cities && data.cities.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
