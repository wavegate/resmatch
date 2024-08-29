import React from "react";
import {
  Card,
  Divider,
  Text,
  SimpleGrid,
  Button,
  Group,
  Avatar,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import services from "@/services/services";
import { schemas } from "@/schemas/schemas";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import Comment from "@/components/Comment/Comment";
import AddComment from "@/pages/updatePages/AddChat/AddChat";
import AddCommentField from "@/components/AddCommentField";
import useUser from "@/hooks/useUser";
import { pageDescription } from "@/schemas/pageDescription";
import programName from "@/utils/programName";
import { generateGravatarUrl } from "@/utils/utils";
import dayjs from "dayjs";

interface DataDisplayProps {
  data: any;
  modelName: string; // The name of the model, e.g., "interviewLogistics"
  i: number;
  queryKey: any;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  data,
  modelName,
  queryKey,
}) => {
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
      fieldName !== "import" &&
      fieldName !== "comments"
  );

  const { user } = useUser();

  const labels = pageDescription[modelName];
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {/* Display program name */}

      {programName(data.program)}

      {/* Display user alias or 'Anonymous' */}
      <div className={`text-sm text-gray-500 flex gap-1.5 items-center`}>
        {data.anonymous ? (
          "Anonymous"
        ) : (
          <Link
            to={`/user/${data.user.id}`}
            className={`underline flex gap-2 items-center inline`}
          >
            <Avatar size="14" src={generateGravatarUrl(data.user?.email, 40)} />
            <div>{data.user?.alias || "-"}</div>
          </Link>
        )}
        <div>·</div>
        <div>{dayjs(data.createdAt).format("M/D/YYYY [at] ha")}</div>
      </div>

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
                // Bin the score values by 5s for specific fields
                if (
                  [
                    "step2Score",
                    "step1Score",
                    "comlex2Score",
                    "step3Score",
                  ].includes(fieldName)
                ) {
                  const score = data[fieldName];
                  const lowerBound = Math.floor(score / 5) * 5;
                  const upperBound = lowerBound + 4;
                  displayValue = `${lowerBound}-${upperBound}`;
                } else {
                  displayValue = data[fieldName];
                }
            }
          } else {
            return false;
          }

          return (
            <div key={fieldName} className={`flex flex-col gap-2`}>
              <Text size="sm" w={500}>
                {fieldSchema.label}:
              </Text>
              <Text size="xs" c="dimmed">
                {fieldSchema.description}
              </Text>
              <Text size="sm">{displayValue}</Text>
            </div>
          );
        })}
      </SimpleGrid>

      {/* Buttons for update and delete */}
      {user?.id === data.userId && (
        <Group justify="right" mt="md">
          <Link to={`/${modelName}/${data.id}`}>
            <Button>Update {labels.singular} Entry</Button>
          </Link>
          <Button
            color="red"
            onClick={handleDelete}
            loading={deleteMutation.isPending}
          >
            Delete {labels.singular} Entry
          </Button>
        </Group>
      )}
      {/* Display comments field */}
      {data.comments && (
        <div className={`flex flex-col gap-4`}>
          {data.comments.map((item: any) => (
            <Comment id={item.id} key={item.id} queryKey={queryKey} />
          ))}
        </div>
      )}
      {user && (
        <AddCommentField
          queryKey={queryKey}
          modelName={modelName}
          id={data.id}
        />
      )}
    </Card>
  );
};

export default DataDisplay;
