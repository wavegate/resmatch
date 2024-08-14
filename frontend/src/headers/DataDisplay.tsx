import React from "react";
import { Card, Divider, Text, SimpleGrid } from "@mantine/core";
import { FormSchema } from "@/pages/updatePages/schema";

interface DataDisplayProps {
  data: any;
  schema: FormSchema;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, schema }) => {
  const filteredFields = Object.keys(schema).filter(
    (fieldName) => fieldName !== "programId" && fieldName !== "anonymous"
  );

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {/* Display program name */}
      <Text weight={500} size="lg">
        {data.program
          ? `${data.program.name} at ${data.program.institution.name}`
          : "-"}
      </Text>

      {/* Display user alias or 'Anonymous' */}
      <Text size="sm" color="dimmed">
        {data.anonymous ? "Anonymous" : data.user?.alias || "-"}
      </Text>

      {/* Display creation date */}
      <Text size="sm" color="dimmed">
        Date Created:{" "}
        {data.createdAt ? new Date(data.createdAt).toLocaleString() : "-"}
      </Text>

      <Divider my="sm" />

      {/* Display fields in a responsive grid */}
      <SimpleGrid spacing="md" cols={{ base: 1, sm: 2 }}>
        {filteredFields.map((fieldName, index) => {
          const fieldSchema = schema[fieldName];
          let displayValue = "-";

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
              default:
                displayValue = data[fieldName];
            }
          }

          return (
            <div
              key={fieldName}
              className={
                index < filteredFields.length - 1 &&
                `border-solid border-b pb-4`
              }
            >
              <Text size="sm" w={500}>
                {fieldSchema.label}:
              </Text>
              <Text size="sm">{displayValue}</Text>
              {fieldSchema.description && (
                <Text size="xs" color="dimmed">
                  {fieldSchema.description}
                </Text>
              )}
            </div>
          );
        })}
      </SimpleGrid>
    </Card>
  );
};

export default DataDisplay;
