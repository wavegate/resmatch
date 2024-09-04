import React from "react";
import { schemas } from "@/schemas/schemas";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import Comment from "@/components/Comment/Comment";
import AddCommentField from "@/components/AddCommentField";
import useUser from "@/hooks/useUser";

interface DataDisplayProps {
  data: any;
  modelName: string; // The name of the model, e.g., "interviewLogistics"
  i: number;
  queryKey: any;
}

const Details: React.FC<DataDisplayProps> = ({ data, modelName, queryKey }) => {
  const schema = schemas[modelName];

  const filteredFields = Object.keys(schema).filter(
    (fieldName) =>
      fieldName !== "programId" &&
      fieldName !== "anonymous" &&
      fieldName !== "import" &&
      fieldName !== "comments" &&
      fieldName !== "cityId"
  );

  const { user } = useUser();

  return (
    <div className={`flex flex-col gap-4 py-4 max-sm:py-2`}>
      {/* Display fields in a responsive grid */}
      <div
        className={`grid grid-cols-[auto_1fr_auto_1fr] max-sm:grid-cols-1 gap-4 border border-solid rounded-sm p-4`}
      >
        {filteredFields.map((fieldName, index) => {
          const fieldSchema = schema[fieldName];
          let displayValue: React.ReactNode = "-";

          if (
            data[fieldName] !== undefined &&
            data[fieldName] !== null &&
            data[fieldName] !== ""
          ) {
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
            <div
              key={fieldName}
              className={`grid col-span-2 grid-cols-subgrid max-sm:col-span-1`}
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
      {user && (
        <AddCommentField
          queryKey={queryKey}
          modelName={modelName}
          id={data.id}
        />
      )}
    </div>
  );
};

export default Details;
