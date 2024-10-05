import { useState, useMemo } from "react";
import { Loader, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import NoRecords from "@/components/NoRecords/NoRecords";
import { Virtuoso } from "react-virtuoso";
import userService from "@/services/userService";
import USApplicantHeader from "../USApplicantTable/USApplicantHeader";
import USApplicantDetail from "../USApplicantTable/USApplicantDetail";

interface TableProps {
  modelName: string;
  className?: string;
}

const flattenObject = (obj, prefix = "") => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key] != null ? obj[key].toString() : ""; // Convert to string if it's not null
    }
    return acc;
  }, {});
};

const searchItems = (items, searchTerm) => {
  return items.filter((item) => {
    // Flatten the object
    const flatItem = flattenObject(item);

    // Check if any value contains the search term (case insensitive)
    return Object.values(flatItem).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};

const Table = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", "IMG"],
    queryFn: () => {
      return userService.searchUser({
        graduateType: "IMG",
      });
    },
  });

  const [searchText, setSearchText] = useState("");
  const [search] = useDebouncedValue(searchText, 200);

  const filteredUsers = useMemo(() => {
    return data?.users?.filter((user) => {
      return Object.keys(user).some(
        (key) =>
          ![
            "id",
            "alias",
            "createdAt",
            "isConfirmed",
            "updatedAt",
            "public",
            "graduateType",
            "googleId",
            "redditId",
            "redditUsername",
            "discordId",
          ].includes(key) && user[key] !== null
      );
    });
  }, [data?.users]);

  const filteredResults = useMemo(() => {
    if (!filteredUsers || search.trim() === "") return filteredUsers || [];

    return searchItems(filteredUsers, search);
  }, [filteredUsers, search]);

  const renderItem = (index) => {
    const datum = filteredResults[index];
    return (
      <div
        key={datum.id}
        className={`border border-solid rounded-lg overflow-hidden ${
          index > 0 ? "mt-4" : ""
        }`}
      >
        <USApplicantHeader i={index} data={datum} />
        <USApplicantDetail i={index} data={datum} />
      </div>
    );
  };

  return (
    <div className={`mt-2 flex-1`}>
      {isLoading && (
        <div className={`flex flex-col items-center`}>
          <Loader color="blue" className={`mt-12`} />
        </div>
      )}
      <div className={`h-full flex flex-col`}>
        <TextInput
          size="md"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.currentTarget.value);
          }}
          className={`mb-2`}
        />
        {!!filteredResults.length && (
          <div className={`flex flex-col gap-4 flex-1`}>
            <Virtuoso
              style={{ height: "100%" }} // Adjust the height as needed
              totalCount={filteredResults.length} // Total number of items
              itemContent={renderItem} // Function to render each item
            />
          </div>
        )}
        {filteredResults && filteredResults.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};

export default Table;
