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
import useUser from "@/hooks/useUser";

export default function TierListDetails() {
  const [suggestion, setSuggestion] = useState("");
  const queryClient = useQueryClient();

  // Fetch tier list data
  const {
    data: tierListData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tierList", 1], // Hardcoding ID 1 for now
    queryFn: () => tierListService.readTierList(1),
  });

  // Fetch suggestions for the tier list
  const { data: suggestionsData } = useQuery({
    queryKey: ["suggestion", 1], // Hardcoding ID 1 for now
    queryFn: () => suggestionService.searchSuggestion({ tierListId: 1 }),
  });

  const { user } = useUser();

  // Mutation to add a new suggestion
  const { mutate: addSuggestion, isPending: isAdding } = useMutation({
    mutationFn: (newSuggestion) =>
      suggestionService.createSuggestion({
        content: newSuggestion,
        tierListId: 1,
      }),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Suggestion added successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["suggestion", 1] });
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

  // Mutation to delete a suggestion
  const { mutate: deleteSuggestion } = useMutation({
    mutationFn: (suggestionId) =>
      suggestionService.deleteSuggestion(suggestionId),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Suggestion deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["suggestion", 1] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete suggestion",
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
    <div className="flex flex-col gap-2">
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          {tierListData.title}
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          US applicants program tier list.
        </Text>
      </header>

      <Accordion
        variant="separated"
        multiple
        defaultValue={[...tierListData.bins.map((bin) => String(bin.id))]}
      >
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
                {suggestion.userId === user?.id && (
                  <Button
                    onClick={() => deleteSuggestion(suggestion.id)}
                    color="red"
                    size="xs"
                  >
                    Delete
                  </Button>
                )}
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
