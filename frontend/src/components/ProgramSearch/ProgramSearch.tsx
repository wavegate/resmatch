import programService from "@/services/programService";
import { Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function ProgramSearch({
  onProgramSelect,
  selected,
  label = "Search program by name",
  required = false,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [search] = useDebouncedValue(searchInput, 200);

  const { data, error, isLoading } = useQuery({
    queryKey: ["programSearch", search],
    queryFn: () => {
      return programService.searchProgram({
        searchTerm: search,
        pageNum: 1,
      });
    },
  });

  // need to fix issue here where unmounting will remove data, and so the selected is not displayed properly

  return (
    <Select
      leftSection={<IoIosSearch />}
      required={required}
      label={label}
      placeholder="eg. Stanford"
      value={String(selected?.id)}
      data={data?.programs.map((program) => ({
        value: program.id.toString(),
        label: `${program.name} at ${program.institution.name}`,
      }))}
      searchable
      clearable
      searchValue={searchInput}
      onSearchChange={setSearchInput}
      onChange={(value) => {
        console.log(value);
        onProgramSelect(
          data?.programs.find((program) => {
            return program.id === Number(value);
          })
        );
      }}
      size="md"
    />
  );
}
