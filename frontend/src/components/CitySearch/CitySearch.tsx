import cityService from "@/services/cityService";
import { Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

export default function CitySearch({
  onCitySelect,
  selected,
  label = "Search city by name",
  required = false,
  onChange,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [search] = useDebouncedValue(searchInput, 200);
  const [initialCity, setInitialCity] = useState(null);

  // Fetch the list of cities based on the search input
  const { data, error, isLoading } = useQuery({
    queryKey: ["citySearch", search],
    queryFn: () => {
      return cityService.searchCity({
        searchTerm: search,
        pageNum: 1,
      });
    },
  });

  // Fetch the city details if a selected cityId exists and the initialCity is not set
  const { data: initialCityData } = useQuery({
    queryKey: ["cityById", selected],
    queryFn: () => cityService.readCity(selected),
    enabled: !!selected && !initialCity, // Run only if there's a selected cityId and no initialCity is set
  });

  useEffect(() => {
    if (initialCityData) {
      setInitialCity({
        value: initialCityData.id.toString(),
        label: `${initialCityData.name}, ${initialCityData.state}`,
      });
    }
  }, [initialCityData]);

  const citiesData = useMemo(() => {
    const cities =
      data?.cities.map((city) => ({
        value: city.id.toString(),
        label: `${city.name}, ${city.state}`,
      })) || [];

    // Check if the initialCity is already in the list
    const isInitialCityInList = cities.some(
      (city) => city.value === initialCity?.value
    );

    // If the initialCity is not in the list, add it
    if (initialCity && !isInitialCityInList) {
      return [initialCity, ...cities];
    }

    return cities;
  }, [data, initialCity]);

  return (
    <Select
      leftSection={<IoIosSearch />}
      required={required}
      label={label}
      placeholder="Enter city name here"
      value={String(selected)}
      data={citiesData}
      searchable
      clearable
      searchValue={searchInput}
      onSearchChange={setSearchInput}
      onChange={(value) => {
        onCitySelect &&
          onCitySelect(
            data?.cities.find((city) => {
              return city.id === Number(value);
            })
          );
        onChange && onChange(Number(value));
      }}
      size="md"
    />
  );
}
