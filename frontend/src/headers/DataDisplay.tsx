import React from "react";
import { Card, Divider, Text, SimpleGrid, Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import services from "@/services/services";
import { schemas } from "@/schemas/schemas";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";

interface DataDisplayProps {
  data: any;
  modelName: string; // The name of the model, e.g., "interviewLogistics"
  i: number;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, modelName, i }) => {
  const schema = schemas[modelName];
  const queryClient = useQueryClient();

  // Mutation for deleting the entry
  const deleteMutation = useMutation({
    mutationFn: () => services[modelName].delete(data.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: `${modelName} entry deleted successfully`,
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: [modelName] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: `Failed to delete the ${modelName} entry`,
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const filteredFields = Object.keys(schema).filter(
    (fieldName) =>
      fieldName !== "programId" &&
      fieldName !== "anonymous" &&
      fieldName !== "import"
  );

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {/* Display program name */}
      <Text w={500} size="lg">
        {data.program
          ? `${data.program.name} at ${data.program.institution.name}`
          : "-"}
      </Text>

      {/* Display user alias or 'Anonymous' */}
      <Text size="sm" c="dimmed">
        {data.anonymous ? "Anonymous" : data.user?.alias || "-"}
      </Text>

      {/* Display creation date */}
      <Text size="sm" c="dimmed">
        Date Created:{" "}
        {data.createdAt ? new Date(data.createdAt).toLocaleString() : "-"}
      </Text>

      <Divider my="sm" />

      {/* Display fields in a responsive grid */}
      <SimpleGrid spacing="md" cols={{ base: 1, sm: 2 }}>
        {filteredFields.map((fieldName, index) => {
          const fieldSchema = schema[fieldName];
          let displayValue: React.ReactNode = "-";

          if (data[fieldName] !== undefined && data[fieldName] !== null) {
            switch (fieldSchema.type) {
              case "boolean":
                displayValue = data[fieldName] ? "Yes" : "No";
                break;
              case "date":
                displayValue = new Date(data[fieldName]).toLocaleDateString();
                break;
              case "multipleDates":
                displayValue = Array.isArray(data[fieldName])
                  ? data[fieldName]
                      .map((date: string) =>
                        new Date(date).toLocaleDateString()
                      )
                      .join(", ")
                  : "-";
                break;
              case "select":
                displayValue =
                  fieldLabelMap[fieldName]?.[data[fieldName]] ||
                  data[fieldName];
                break;
              case "array":
                if (
                  fieldSchema.of === "string" &&
                  Array.isArray(data[fieldName])
                ) {
                  displayValue = (
                    <ul>
                      {data[fieldName].map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  );
                } else {
                  displayValue = data[fieldName].join(", ");
                }
                break;
              default:
                displayValue = data[fieldName];
            }
          } else {
            return false;
          }

          return (
            <div key={fieldName} className={`flex flex-col gap-2`}>
              <Text size="sm" w={500}>
                {fieldSchema.label}:
              </Text>
              <Text size="sm">{displayValue}</Text>

              <Text size="xs" c="dimmed">
                {fieldSchema.description}
              </Text>
            </div>
          );
        })}
      </SimpleGrid>

      {/* Buttons for update and delete */}
      <Group justify="right" mt="md">
        <Link to={`/${modelName}/${data.id}`}>
          <Button>Update {modelName} Entry</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete {modelName} Entry
        </Button>
      </Group>
    </Card>
  );
};

export default DataDisplay;
