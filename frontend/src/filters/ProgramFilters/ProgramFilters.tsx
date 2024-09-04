import cityService from "@/services/cityService";
import { TextInput, Button, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { IoMdClose } from "react-icons/io";

interface ProgramFiltersProps {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  clearFilters: () => void;
}

export default function ProgramFilters({
  searchInput,
  setSearchInput,
  nrmpSearchInput,
  setNRMPSearchInput,
  clearFilters,
  state,
  setState,
  setPageNum,
  citySearchInput,
  setCitySearchInput,
}: ProgramFiltersProps) {
  const { data: states, isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: cityService.getStates,
  });

  const stateOptions = states?.map((stateItem) => ({
    value: stateItem.state,
    label: stateItem.state,
  }));

  return (
    <div className="flex flex-col gap-4 p-4">
      <TextInput
        label="Search by institution name"
        placeholder="eg. Crestwood"
        value={searchInput}
        onChange={(event) => {
          setSearchInput(event.currentTarget.value);
          setPageNum(1);
        }}
        size="md"
      />
      <TextInput
        label="Search by NRMP Program Code"
        placeholder="eg. 2947"
        value={nrmpSearchInput}
        onChange={(event) => {
          setNRMPSearchInput(event.currentTarget.value);
          setPageNum(1);
        }}
        size="md"
      />
      <TextInput
        label="Search by City name"
        placeholder="eg. Stanford"
        value={citySearchInput}
        onChange={(event) => {
          setCitySearchInput(event.currentTarget.value);
          setPageNum(1);
        }}
        size="md"
      />

      <Select
        label="Select State"
        placeholder="Pick a state"
        value={state}
        onChange={(value) => {
          setState(value);
          setPageNum(1);
        }}
        data={stateOptions || []}
        size="md"
        disabled={isLoading}
        clearable
      />

      <Button
        variant="outline"
        leftSection={<IoMdClose />}
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}
