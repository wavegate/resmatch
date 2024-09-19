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
import Suggestion from "./Suggestion";
import programName from "@/utils/programName";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";
import { Link } from "react-router-dom";

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

  const colors = [
    "bg-red-200",
    "bg-orange-200",
    "bg-yellow-200",
    "bg-lime-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-purple-200",
    "bg-pink-200",
  ];
  const colors2 = [
    "bg-red-50",
    "bg-orange-50",
    "bg-yellow-50",
    "bg-lime-50",
    "bg-green-50",
    "bg-blue-50",
    "bg-purple-50",
    "bg-pink-50",
  ];

  return (
    <>
      <Helmet>
        <title>Tier List | {APP_NAME}</title>
      </Helmet>
      <div className="flex flex-col gap-2">
        <header>
          <Title
            order={2}
            mb={{ base: "xs", md: "sm" }}
            className="text-lg sm:text-xl md:text-2xl !mb-0"
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
        <div className={`grid grid-cols-[auto_1fr] gap-y-4 max-sm:gap-y-2`}>
          {tierListData.bins.map((bin: any, index) => (
            <>
              <div
                className={`font-medium p-4 rounded-l-lg ${colors[index]} flex items-center justify-center text-center max-w-[120px] max-sm:max-w-[100px] max-sm:p-2 max-sm:text-sm`}
              >
                {bin.name}
              </div>

              <div className={`p-4 rounded-r-lg ${colors2[index]} max-sm:p-2`}>
                <ul>
                  {bin.programs.map((binAssignment: any, index) => (
                    <li key={binAssignment.program.id}>
                      <Link
                        to={`/program/${binAssignment.program.id}/details`}
                        className={`hover:underline max-sm:text-sm`}
                      >
                        {programName(binAssignment.program)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ))}
        </div>

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
            <ul className="mt-4 list-disc list-inside">
              {suggestionsData.suggestions.map((suggestion: any) => (
                <Suggestion suggestion={suggestion} key={suggestion.id} />
              ))}
            </ul>
          ) : (
            <NoRecords />
          )}
        </div>
      </div>
    </>
  );
}
