import { Button, Group, Text } from "@mantine/core";
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

  return (
    <div>
      <Group justify="apart">
        <Link to={`/city/${item.id}`}>
          <Button>Update City</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete City
        </Button>
      </Group>
      <div>
        <Text size="lg" weight={500}>
          {item.name}
        </Text>
        <Text color="dimmed">{item.state}</Text>
      </div>

      {/* Display the aggregated CityUserInput data */}
      <div className="mt-4">
        {item.userInputs.pros.length > 0 && (
          <div>
            <Text weight={500}>Pros</Text>
            {item.userInputs.pros.map((pro, index) => (
              <Text key={index}>&#8226; {pro}</Text>
            ))}
          </div>
        )}

        {item.userInputs.cons.length > 0 && (
          <div>
            <Text weight={500}>Cons</Text>
            {item.userInputs.cons.map((con, index) => (
              <Text key={index}>&#8226; {con}</Text>
            ))}
          </div>
        )}

        {item.userInputs.publicTransportation.length > 0 && (
          <div>
            <Text weight={500}>Public Transportation</Text>
            {item.userInputs.publicTransportation.map((transport, index) => (
              <Text key={index}>&#8226; {transport}</Text>
            ))}
          </div>
        )}

        {item.userInputs.weather.length > 0 && (
          <div>
            <Text weight={500}>Weather</Text>
            {item.userInputs.weather.map((weather, index) => (
              <Text key={index}>&#8226; {weather}</Text>
            ))}
          </div>
        )}

        {item.userInputs.dating.length > 0 && (
          <div>
            <Text weight={500}>Dating</Text>
            {item.userInputs.dating.map((dating, index) => (
              <Text key={index}>&#8226; {dating}</Text>
            ))}
          </div>
        )}

        {item.userInputs.lgbtq.length > 0 && (
          <div>
            <Text weight={500}>LGBTQ+</Text>
            {item.userInputs.lgbtq.map((lgbtq, index) => (
              <Text key={index}>&#8226; {lgbtq}</Text>
            ))}
          </div>
        )}

        {item.userInputs.diversity.length > 0 && (
          <div>
            <Text weight={500}>Diversity</Text>
            {item.userInputs.diversity.map((diversity, index) => (
              <Text key={index}>&#8226; {diversity}</Text>
            ))}
          </div>
        )}

        {item.userInputs.safetyCrime.length > 0 && (
          <div>
            <Text weight={500}>Safety & Crime</Text>
            {item.userInputs.safetyCrime.map((safety, index) => (
              <Text key={index}>&#8226; {safety}</Text>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
