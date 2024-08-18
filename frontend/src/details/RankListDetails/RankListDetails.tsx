import { Accordion, Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import rankListService from "@/services/rankListService";
import { notifications } from "@mantine/notifications";
import { useMemo } from "react";
import rankListFormSchema from "@/schemas/rankListFormSchema";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import AddCommentField from "@/components/AddCommentField";

export default function RankListDetails({ item: data, type }) {
  const schema = rankListFormSchema;

  const filteredFields = Object.keys(schema).filter(
    (fieldName) =>
      fieldName !== "programId" &&
      fieldName !== "anonymous" &&
      fieldName !== "import" &&
      fieldName !== "comments"
  );

  return (
    <Accordion.Panel>
      <div className={`flex flex-col gap-4 py-4`}>
        {/* Display fields in a responsive grid */}
        <div
          className={`grid grid-cols-[auto_1fr_auto_1fr] max-sm:grid-cols-[auto_1fr] gap-4 border border-solid rounded-sm p-4`}
        >
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
              <div
                key={fieldName}
                className={`grid col-span-2 grid-cols-subgrid`}
              >
                <div className={`font-medium`}>{fieldSchema.label}:</div>
                {/* <div>{fieldSchema.description}</div> */}
                <div className={`text-gray-600`}>{displayValue}</div>
              </div>
            );
          })}
        </div>

        {/* Display comments field */}

        {data.comments?.length > 0 && (
          <div className={`flex flex-col gap-4`}>
            {data.comments.map((item: any) => (
              <Comment id={item.id} key={item.id} queryKey={queryKey} />
            ))}
          </div>
        )}
        {/* <AddCommentField
          queryKey={queryKey}
          modelName={modelName}
          id={data.id}
        /> */}
      </div>
      {data.RankedProgram?.length > 0 ? (
        <ol className={`list-decimal pl-6 indent-1.5 flex flex-col gap-1`}>
          {data.RankedProgram.sort((a, b) => a.rank - b.rank).map(
            (rankedProgram) => (
              <li key={rankedProgram.id}>
                {rankedProgram.program.name} at{" "}
                {rankedProgram.program.institution.name}
              </li>
            )
          )}
        </ol>
      ) : (
        <Text>No programs ranked.</Text>
      )}
    </Accordion.Panel>
  );
}
