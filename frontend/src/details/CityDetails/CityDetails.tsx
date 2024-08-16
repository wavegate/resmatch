import { Button, Card, Group, SimpleGrid, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cityService from "@/services/cityService";
import { notifications } from "@mantine/notifications";

export default function CityDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => cityService.deleteCity(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "City deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["city"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the city",
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const fields = [
    { label: "Pros", value: item.userInputs.pros },
    { label: "Cons", value: item.userInputs.cons },
    {
      label: "Public Transportation",
      value: item.userInputs.publicTransportation,
    },
    { label: "Weather", value: item.userInputs.weather },
    { label: "Dating", value: item.userInputs.dating },
    { label: "LGBTQ+", value: item.userInputs.lgbtq },
    { label: "Diversity", value: item.userInputs.diversity },
    { label: "Safety & Crime", value: item.userInputs.safetyCrime },
  ];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <div className="grid grid-cols-[1fr] gap-4">
        <div className="flex flex-col gap-1">
          <Text className="text-sm sm:text-md md:text-lg font-medium">
            {`${item.name}, ${item.state}`}
          </Text>
          <div className="flex items-center gap-2">
            {item.user && (
              <Link to={`/user/${item.user.id}`}>
                <Text c="dimmed" className="text-xs sm:text-sm underline">
                  {item.user.alias}
                </Text>
              </Link>
            )}
          </div>
        </div>
      </div>
      <SimpleGrid spacing="md" cols={{ base: 1, sm: 2 }}>
        {fields.map((field, index) => {
          let displayValue = "-";

          if (Array.isArray(field.value) && field.value.length > 0) {
            displayValue = (
              <ul>
                {field.value.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            );
          }

          return (
            <div key={index} className="flex flex-col gap-2">
              <Text w={500}>{field.label}:</Text>
              <Text size="sm">{displayValue}</Text>
            </div>
          );
        })}
      </SimpleGrid>
    </Card>
  );
}
