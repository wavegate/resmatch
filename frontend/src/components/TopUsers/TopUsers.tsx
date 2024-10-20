import inviteService from "@/services/inviteService";
import { useQuery } from "@tanstack/react-query";
import { Loader, Card, Text } from "@mantine/core";
import { useMemo, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import classNames from "classnames";
import UserLink from "@/components/UserLink";

const TopUsers = () => {
  const gridRef = useRef<any>();

  // Fetch the top 10 users data
  const {
    data: topUsersData,
    error: topUsersError,
    isLoading: isTopUsersLoading,
  } = useQuery({
    queryKey: ["top-10-users"],
    queryFn: () => inviteService.getTop10UsersByInvites(),
  });

  // Prepare the row data for AG Grid
  const rowData = useMemo(() => {
    if (topUsersData) {
      return topUsersData?.map((user: any) => ({
        alias: user.alias || "Unknown User",
        id: user.userId, // Assuming you have user ID for the link
        invitesCount: user.inviteCount,
      }));
    }
  }, [topUsersData]);

  // Define the column structure for AG Grid
  const columnDefs = useMemo(
    () => [
      {
        headerName: "User",
        field: "alias",
        cellRenderer: ({ data }) => {
          return (
            <UserLink
              data={{
                user: data,
              }}
            />
          );
        }, // Link to user profile
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        headerName: "Invites",
        field: "invitesCount",
        sortable: true,
        filter: true,
        resizable: true,
        width: 100,
      },
    ],
    []
  );

  // Loading states
  if (isTopUsersLoading) {
    return <Loader />;
  }

  // Error handling
  if (topUsersError) {
    return <div>Error loading data</div>;
  }

  return (
    <Card shadow="sm" withBorder radius="lg">
      <div className="flex flex-col">
        <Text className="text-xl font-medium">Users with the Most Invites</Text>
        <Text className="text-gray-500 text-sm mb-4">
          The top 10 users with the most non-anonymous invites.
        </Text>
        <div
          className={classNames("ag-theme-quartz", "table-selector", "compact")}
          style={{ height: 400 }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            enableCellTextSelection={true}
            ensureDomOrder={true}
            modules={[ClientSideRowModelModule]}
          />
        </div>
      </div>
    </Card>
  );
};

export default TopUsers;
