import { Accordion, Text } from "@mantine/core";
import Comment from "@/components/Comment/Comment";
import rankListFormSchema from "@/schemas/rankListFormSchema";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import AddCommentField from "@/components/AddCommentField";
import programName from "@/utils/programName";
import useUser from "@/hooks/useUser";

export default function RankListDetails({ item: data, type, queryKey }) {
  const schema = rankListFormSchema;

  const filteredFields = Object.keys(schema).filter(
    (fieldName) =>
      fieldName !== "programId" &&
      fieldName !== "anonymous" &&
      fieldName !== "import" &&
      fieldName !== "comments"
  );

  const { user } = useUser();

  return (
    <Accordion.Panel>
      <div className={`flex flex-col gap-4 py-4`}>
        {data.RankedProgram?.length > 0 ? (
          <ol className={`list-decimal pl-6 indent-1.5 flex flex-col gap-1`}>
            {data.RankedProgram.sort((a, b) => a.rank - b.rank).map(
              (rankedProgram) => (
                <li key={rankedProgram.id}>
                  {programName(rankedProgram.program)}
                </li>
              )
            )}
          </ol>
        ) : (
          <Text>No programs ranked.</Text>
        )}
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
              fieldName !== "matchedProgramId"
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
                  displayValue = data[fieldName];
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
          {data.matchedProgram && (
            <div
              className={`grid col-span-2 grid-cols-subgrid max-sm:col-span-1`}
            >
              <div className={`font-medium`}>Matched program:</div>
              {/* <div>{fieldSchema.description}</div> */}
              <div className={`text-gray-600`}>
                {programName(data.matchedProgram)}
              </div>
            </div>
          )}
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
            modelName={"rankList"}
            id={data.id}
          />
        )}
      </div>
    </Accordion.Panel>
  );
}
