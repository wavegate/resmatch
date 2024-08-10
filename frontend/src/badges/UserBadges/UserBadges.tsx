import userService from "@/services/userService";
import {
  Button,
  Pagination,
  Accordion,
  Drawer,
  Text,
  Loader,
  Badge,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "@/constants";
import useUser from "@/hooks/useUser";
import NoRecords from "@/components/NoRecords/NoRecords";
import UserFilters from "@/filters/UserFilters/UserFilters";

interface UsersTableProps {
  className?: string;
}

export default ({ className }: UsersTableProps) => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["user", searchTerm, pageNum],
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
      return data.users?.map((user: any) => (
        <Accordion.Item key={user.id} value={user.id.toString()}>
          <Accordion.Control className={`pl-0`}>
            <div className="grid grid-cols-[80px,1fr] gap-4">
              <div className="flex items-center justify-center">
                <Avatar size="sm" />
              </div>
              <div className="flex flex-col gap-1">
                <Text className="text-sm sm:text-md md:text-lg font-medium">
                  {user.alias}
                </Text>
                <div className="flex items-center gap-2">
                  <Text className="text-xs sm:text-sm">
                    <strong>Graduate Type:</strong> {user.graduateType || "N/A"}
                  </Text>
                  <Text className="text-xs sm:text-sm">
                    <strong>Medical Degree:</strong>{" "}
                    {user.medicalDegree || "N/A"}
                  </Text>
                  <Text className="text-xs sm:text-sm">
                    <strong>IMG:</strong> {user.img || "N/A"}
                  </Text>
                  <Text className="text-xs sm:text-sm">
                    <strong>Step 2 Score:</strong> {user.step2Score || "N/A"}
                  </Text>
                </div>
              </div>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Link to={`/user/${user.id}`}>
              <Button variant="outline" size="sm">
                Update Applicant
              </Button>
            </Link>
            <div className="flex flex-col gap-4">
              <Text>
                <strong>Alias:</strong> {user.alias}
              </Text>
              <Text>
                <strong>Graduate Type:</strong> {user.graduateType || "N/A"}
              </Text>
              <Text>
                <strong>Medical Degree:</strong> {user.medicalDegree || "N/A"}
              </Text>
              <Text>
                <strong>IMG Type:</strong> {user.img || "N/A"}
              </Text>
              <Text>
                <strong>Step 1 Score:</strong> {user.step1Score || "N/A"}
              </Text>
              <Text>
                <strong>Step 2 Score:</strong> {user.step2Score || "N/A"}
              </Text>
              <Text>
                <strong>COMLEX 1 Score:</strong> {user.comlex1Score || "N/A"}
              </Text>
              <Text>
                <strong>COMLEX 2 Score:</strong> {user.comlex2Score || "N/A"}
              </Text>
              <Text>
                <strong>School Ranking:</strong> {user.schoolRanking || "N/A"}
              </Text>
              <Text>
                <strong>Class Rank:</strong> {user.classRank || "N/A"}
              </Text>
              <Text>
                <strong>Green Card:</strong> {user.greenCard ? "Yes" : "No"}
              </Text>
              <Text>
                <strong>Visa Required:</strong>{" "}
                {user.visaRequired ? "Yes" : "No"}
              </Text>
              <Text>
                <strong>ECFMG Certified:</strong>{" "}
                {user.ecfmgCertified ? "Yes" : "No"}
              </Text>
              <Text>
                <strong>Year of Graduation:</strong>{" "}
                {user.yearOfGraduation || "N/A"}
              </Text>
              <Text>
                <strong>Months of USCE:</strong> {user.monthsOfUSCE || "N/A"}
              </Text>
              <Text>
                <strong>Number of Publications:</strong>{" "}
                {user.numPublications || "N/A"}
              </Text>
              <Text>
                <strong>Number of Work Experiences:</strong>{" "}
                {user.numWorkExperiences || "N/A"}
              </Text>
              <Text>
                <strong>Number of Volunteer Experiences:</strong>{" "}
                {user.numVolunteerExperiences || "N/A"}
              </Text>
              <Text>
                <strong>Other Degrees:</strong> {user.otherDegrees || "N/A"}
              </Text>
              <Text>
                <strong>Application Year:</strong>{" "}
                {user.applicationYear || "N/A"}
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
        <UserFilters
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
