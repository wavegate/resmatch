import { useQuery } from "@tanstack/react-query";
import { Text, Group, Title, Divider, Button, SimpleGrid } from "@mantine/core";
import userService from "@/services/userService";
import useUser from "@/hooks/useUser";
import { Link, useParams } from "react-router-dom";
import DataDisplay from "@/headers/DataDisplay";
import userProfileFormSchema from "@/schemas/userProfileFormSchema";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";

export default function Profile() {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id ? id : user?.id],
    queryFn: () => userService.readUser(id ? id : user?.id),
    enabled: !!(user || id),
  });

  if (data && !data.public) {
    return <div>This user's profile is not public.</div>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading profile</Text>;
  }

  const schema = userProfileFormSchema;

  return (
    <div>
      {data && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Title order={2}>
              {id ? `${data.alias}'s Public Profile` : "My Profile"}
            </Title>
            {!id && (
              <Button
                component={Link}
                to={`/user/add/${user.id}`}
                variant="outline"
              >
                Update Profile
              </Button>
            )}
          </div>
          <Divider />
          <SimpleGrid spacing="md" cols={{ base: 1, sm: 2 }}>
            {Object.keys(schema).map((fieldName, index) => {
              const fieldSchema = schema[fieldName];
              let displayValue: React.ReactNode = "-";

              if (data[fieldName] !== undefined && data[fieldName] !== null) {
                switch (fieldSchema.type) {
                  case "boolean":
                    displayValue = data[fieldName] ? "Yes" : "No";
                    break;
                  case "date":
                    displayValue = new Date(
                      data[fieldName]
                    ).toLocaleDateString();
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
        </div>
      )}
    </div>
  );
}
