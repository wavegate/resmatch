import {
  Accordion,
  Loader,
  Text,
  Title,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import tierListService from "@/services/tierListService";
import suggestionService from "@/services/suggestionService";
import NoRecords from "@/components/NoRecords/NoRecords";
import { notifications } from "@mantine/notifications";

export default function TierListDetails() {
  const [suggestion, setSuggestion] = useState("");
  const queryClient = useQueryClient();

  // Fetch tier list data
  const {
    data: tierListData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tierList", 2], // Hardcoding ID 1 for now
    queryFn: () => tierListService.readTierList(2),
  });

  // Fetch suggestions for the tier list
  const { data: suggestionsData } = useQuery({
    queryKey: ["suggestion", 2], // Hardcoding ID 1 for now
    queryFn: () => suggestionService.searchSuggestion({ tierListId: 2 }),
  });

  // Mutation to add a new suggestion
  const { mutate: addSuggestion, isPending: isAdding } = useMutation({
    mutationFn: (newSuggestion) =>
      suggestionService.createSuggestion({
        content: newSuggestion,
        tierListId: 2,
      }),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Suggestion added successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["suggestion", 2] });
      setSuggestion(""); // Clear the input field
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to add suggestion",
        color: "red",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <Loader color="blue" className="mt-12" />
      </div>
    );
  }

  if (!tierListData) {
    return <NoRecords />;
  }

  return (
    <div className="flex flex-col gap-4">
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          {tierListData.title}
        </Title>
      </header>

      <Accordion>
        {tierListData.bins.map((bin: any) => (
          <Accordion.Item key={bin.id} value={bin.id.toString()}>
            <Accordion.Control>
              <Text className="font-medium">{bin.name}</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <ul>
                {bin.programs.map((program: any) => (
                  <li key={program.id}>
                    {program.name} at {program.institution.name}
                  </li>
                ))}
              </ul>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      <div className="mt-6">
        <Title order={3} mb="xs" className="text-lg">
          Suggestions
        </Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (suggestion.trim()) {
              addSuggestion(suggestion);
            }
          }}
        >
          <Group>
            <TextInput
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Add a suggestion"
              required
              className="flex-grow"
            />
            <Button type="submit" loading={isAdding}>
              Submit
            </Button>
          </Group>
        </form>

        {suggestionsData?.suggestions?.length > 0 ? (
          <ul className="mt-4">
            {suggestionsData.suggestions.map((suggestion: any) => (
              <li key={suggestion.id}>
                <Text>{suggestion.content}</Text>
              </li>
            ))}
          </ul>
        ) : (
          <NoRecords />
        )}
      </div>
    </div>
  );
}
