import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import programName from "@/utils/programName";
import { schemas } from "@/schemas/schemas";
import { Link } from "react-router-dom";
import UserLink from "@/components/UserLink";
import { displayUTC } from "@/utils/utils";

export function interviewInviteColumnGenerator(
  modelName: string,
  user,
  openDeleteModal
) {
  // Get the schema for the provided modelName
  const formSchema = schemas[modelName];

  const filterOutFields = [
    "programId",
    "programXId",
    "programYId",
    "anonymous",
    "import",
    "comments",
    "save",
    "cityId",
  ];
  // Filter out specific fields
  const filteredFields = Object.keys(formSchema).filter(
    (fieldName) => !filterOutFields.includes(fieldName)
  );
  const columns = [];

  if (modelName === "cityUserInput") {
    columns.push(
      {
        headerName: "City",
        field: "city.name",
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: ["contains"],
          maxNumConditions: 1,
        },
      },
      {
        headerName: "State",
        field: "city.state",
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: ["contains"],
          maxNumConditions: 1,
        },
      }
    );
  } else if (modelName !== "xorY") {
    columns.push({
      headerName: "State",
      field: "program.city.state",
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["contains"],
        maxNumConditions: 1,
      },
      width: "120px",
    });
    columns.push({
      field: "program.institution.name",
      headerName: "Program Name",
      valueGetter: (params) => {
        if (!params.data) {
          return undefined;
        }
        return programName(params.data.program);
      },
      cellRenderer: ({ data }) => {
        if (!data) {
          return false;
        }
        return (
          <Link
            to={`/program/${data.program.id}/details`}
            className={`hover:underline`}
          >
            {programName(data.program)}
          </Link>
        );
      },
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["contains"],
        maxNumConditions: 1,
      },
      width: "300px",
    });

    if (modelName === "xorY") {
      columns.push({
        field: "programX.institution.name",
        headerName: "Program X",
        valueGetter: (params) => {
          if (!params.data) {
            return undefined;
          }
          return programName(params.data.programX);
        },
        cellRenderer: ({ data }) => {
          if (!data) {
            return false;
          }
          return (
            <Link
              to={`/program/${data.programX.id}/details`}
              className={`hover:underline`}
            >
              {programName(data.programX)}
            </Link>
          );
        },
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: ["contains"],
          maxNumConditions: 1,
        },
        width: "300px",
      });

      columns.push({
        field: "programY.institution.name",
        headerName: "Program Y",
        valueGetter: (params) => {
          if (!params.data) {
            return undefined;
          }
          return programName(params.data.programY);
        },
        cellRenderer: ({ data }) => {
          if (!data) {
            return false;
          }
          return (
            <Link
              to={`/program/${data.programY.id}/details`}
              className={`hover:underline`}
            >
              {programName(data.programY)}
            </Link>
          );
        },
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: ["contains"],
          maxNumConditions: 1,
        },
        width: "300px",
      });
    }
  }

  // Iterate over the filtered fields in the schema to generate the remaining columns
  filteredFields.forEach((fieldName) => {
    const field = formSchema[fieldName];
    let columnDef: any = {
      headerName: field.label || fieldName, // Use label from schema or fieldName as fallback
      field: fieldName,
      filter: true,
      width: field?.width,
    };

    // Handle different field types
    switch (field.type) {
      case "multipleDates":
        columnDef.valueGetter = (params) => {
          const data = params.data;
          if (!data) {
            return undefined;
          }
          const datesArray = data[fieldName];
          return Array.isArray(datesArray)
            ? datesArray.map((date: string) => displayUTC(date)).join(", ")
            : null; // Don't display "-" if not available
        };
        columnDef.sortable = false;
        break;

      case "select":
        columnDef.valueGetter = (params) => {
          const value = params?.data?.[fieldName];
          return fieldLabelMap?.[fieldName]?.[value] ?? value;
        };
        columnDef.filter = "agTextColumnFilter";
        columnDef.filterParams = {
          filterOptions: ["contains"],
        };
        break;

      case "number":
        columnDef.filter = "agNumberColumnFilter";
        columnDef.filterParams = {
          filterOptions: [
            "equals",
            "greaterThanOrEqual",
            "lessThanOrEqual",
            "inRange",
          ],
          maxNumConditions: 1,
        };
        columnDef.valueGetter = (params) => {
          const data = params?.data;
          const scoreFields = [
            "step2Score",
            "step1Score",
            "comlex2Score",
            "step3Score",
          ];

          if (scoreFields.includes(fieldName)) {
            const score = data?.[fieldName];
            if (score) {
              const lowerBound = Math.floor(score / 5) * 5;
              const upperBound = lowerBound + 4;
              return `${lowerBound}-${upperBound}`;
            }
          }
          return data?.[fieldName];
        };
        break;

      case "date":
        columnDef.filter = "agDateColumnFilter";
        columnDef.filterParams = {
          filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
          maxNumConditions: 1,
        };
        columnDef.valueFormatter = (params) => {
          const dateValue = params.value;
          return dateValue ? displayUTC(dateValue) : null;
        };
        break;

      case "boolean":
        columnDef.cellDataType = "text";
        columnDef.valueGetter = (params) => {
          const value = params?.data?.[fieldName];
          if (value === true) {
            return "Yes";
          } else if (value === false) {
            return "No";
          } else {
            return "";
          }
        };
        columnDef.filter = "agTextColumnFilter";
        columnDef.filterParams = {
          filterOptions: ["contains"],
        };
        break;

      default:
        // columnDef.autoHeight = true;
        // columnDef.cellClass = "cell-wrap-text";
        columnDef.filter = "agTextColumnFilter";
        columnDef.filterParams = {
          filterOptions: ["contains"],
        };
        break;
    }

    columns.push(columnDef);
  });

  columns.push({
    headerName: "User",
    field: "user.alias",
    valueGetter: ({ data }) => {
      if (!data) {
        return undefined;
      }
      return data.anonymous ? "Anonymous" : data?.user?.alias;
    },
    cellRenderer: ({ data }) => {
      if (!data) {
        return undefined;
      }
      return <UserLink data={data} />;
    },
    width: "140px",
    sortable: false,
  });

  columns.push({
    headerName: "Created at",
    field: "createdAt",
    filter: "agDateColumnFilter",
    valueGetter: (params) => {
      const dateValue = params.data?.["createdAt"];
      return dateValue ? new Date(dateValue) : null;
    },
    valueFormatter: (params) => {
      const dateValue = params.value;
      return dateValue ? new Date(dateValue).toLocaleDateString() : null;
    },
    width: "130px",
  });

  columns.push({
    field: "comments",
    headerName: "Comments",
    width: "150px",
    valueGetter: ({ data }) => {
      if (!data) {
        return undefined;
      }
      return data.comments?.length || 0;
    },
    cellRenderer: (params) => {
      const data = params?.data;
      if (!data) {
        return undefined;
      }
      const modelId = data.id;
      const commentCount = data.comments?.length || 0;

      return (
        <div className="flex gap-4 items-center mt-2">
          <Link
            to={`/${modelName}/${modelId}/details`}
            className="text-sm underline text-gray-500 hover:cursor-pointer"
            target="_blank"
          >
            {`${commentCount} Comment${commentCount === 1 ? "" : "s"}`}
          </Link>
        </div>
      );
    },
    sortable: false,
  });

  // columns.push({
  //   headerName: "Comments",
  //   autoHeight: true,
  //   cellClass: "cell-wrap-text",
  //   width: "400px",
  //   cellRenderer: (params) => {
  //     const [addComment, setAddComment] = useState(false);
  //     const data = params?.data;
  //     const keys = [queryKey, [modelName, data?.id]];

  //     return (
  //       <div className={`flex flex-col gap-2`}>
  //         {data?.comments?.length > 0 && (
  //           <div className={`flex flex-col gap-4`}>
  //             {data?.comments.map((item: any) => (
  //               <Comment
  //                 id={item.id}
  //                 key={item.id}
  //                 postId={data?.id}
  //                 queryKey={queryKey}
  //                 modelName={modelName}
  //               />
  //             ))}
  //           </div>
  //         )}
  //         {user && (
  //           <div
  //             className={`text-sm text-gray-500 hover:cursor-pointer underline`}
  //             onClick={() => setAddComment((prev) => !prev)}
  //           >
  //             Add comment
  //           </div>
  //         )}
  //         {user && addComment && (
  //           <AddCommentField
  //             queryKey={keys}
  //             modelName={modelName}
  //             id={data?.id}
  //           />
  //         )}
  //       </div>
  //     );
  //   },
  // });

  columns.push({
    field: "actions",
    sortable: false,
    headerName: "Actions",
    cellRenderer: (params) => {
      const data = params?.data;
      if (!data) {
        return undefined;
      }
      const modelId = data.id;
      return (
        <div className="flex gap-4 items-center mt-2">
          {/* <Upvote modelName={modelName} item={data} /> */}
          <Link
            to={`/${modelName}/${modelId}/details`}
            target="_blank"
            className="text-sm underline text-gray-500 hover:cursor-pointer"
          >
            Details
          </Link>
          {user && user?.id === data.userId && (
            <>
              <Link
                to={`/${modelName}/${modelId}`}
                className="text-sm underline text-gray-500 hover:cursor-pointer"
              >
                Edit
              </Link>
              <div
                className="text-sm underline text-red-500 hover:cursor-pointer"
                onClick={() => openDeleteModal(data.id)}
              >
                Delete
              </div>
            </>
          )}
        </div>
      );
    },
  });

  return columns;
}
