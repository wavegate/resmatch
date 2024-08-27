import programService from "@/services/programService";
import programName from "@/utils/programName";
import { Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

export default function ProgramSearch({
  onProgramSelect,
  selected,
  label = "Search program by name",
  required = false,
  onChange,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [search] = useDebouncedValue(searchInput, 200);
  const [initialProgram, setInitialProgram] = useState(null);

  console.log(search);

  // Fetch the list of programs based on the search input
  const { data, error, isLoading } = useQuery({
    queryKey: ["programSearch", search],
    queryFn: () => {
      return programService.searchProgram({
        searchTerm: search,
        pageNum: 1,
      });
    },
  });

  // // Fetch the program details if a selected programId exists and the initialProgram is not set
  // const { data: initialProgramData } = useQuery({
  //   queryKey: ["programById", selected],
  //   queryFn: () => programService.readProgram(selected),
  //   enabled: !!selected && !initialProgram, // Run only if there's a selected programId and no initialProgram is set
  // });

  // useEffect(() => {
  //   if (initialProgramData) {
  //     setInitialProgram({
  //       value: initialProgramData.id.toString(),
  //       label: programName(initialProgramData),
  //     });
  //   }
  // }, [initialProgramData]);

  const programsData = useMemo(() => {
    const programs =
      data?.programs.map((program) => ({
        value: program.id.toString(),
        label: programName(program),
      })) || [];

    // // Check if the initialProgram is already in the list
    // const isInitialProgramInList = programs.some(
    //   (program) => program.value === initialProgram?.value
    // );

    // // If the initialProgram is not in the list, add it
    // if (initialProgram && !isInitialProgramInList) {
    //   return [initialProgram, ...programs];
    // }

    return programs;
  }, [data, initialProgram]);

  // console.log(programsData);

  return (
    <Select
      leftSection={<IoIosSearch />}
      required={required}
      label={label}
      placeholder="Enter institution name here"
      value={String(selected)}
      data={programsData}
      searchable
      clearable
      searchValue={searchInput}
      onSearchChange={(value) => {
        console.log(value);
        setSearchInput(value);
      }}
      onChange={(value) => {
        onProgramSelect &&
          onProgramSelect(
            data?.programs.find((program) => {
              return program.id === Number(value);
            })
          );
        onChange && onChange(Number(value));
      }}
      size="md"
    />
  );
}
