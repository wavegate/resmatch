import { Button } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, forwardRef, useMemo, useCallback } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import services from "@/services/services";
import useUser from "@/hooks/useUser";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { pageDescription } from "@/schemas/pageDescription";
import classNames from "classnames";
import { MdCloseFullscreen, MdOutlineOpenInFull } from "react-icons/md";
import { interviewInviteColumnGenerator } from "../interviewInviteColumns";

const InterviewInviteTableView = forwardRef(
  ({ modelName, showFollowed }, ref) => {
    const queryClient = useQueryClient();
    const [fullScreen, setFullScreen] = useState(false);
    const labels = pageDescription[modelName];

    const deleteMutation = useMutation({
      mutationFn: (id) => services[modelName].delete(id),
      onSuccess: () => {
        notifications.show({
          title: "Success",
          message: `${labels.singular} entry deleted successfully`,
          color: "green",
        });
        queryClient.invalidateQueries({ queryKey: [modelName] });
      },
      onError: () => {
        notifications.show({
          title: "Error",
          message: `Failed to delete the ${labels.singular} entry`,
          color: "red",
        });
      },
    });

    const openDeleteModal = (id) =>
      modals.openConfirmModal({
        title: (
          <span
            className={`font-medium`}
          >{`Delete this ${labels.singular}?`}</span>
        ),
        centered: true,
        children: <div>This action cannot be reversed.</div>,
        labels: { confirm: "Delete", cancel: "Cancel" },
        confirmProps: { color: "red" },
        onConfirm: () => {
          deleteMutation.mutate(id);
        },
      });

    const queryKey = [modelName, "rowModel"];
    const { user } = useUser();
    const columnDefs = useMemo(() => {
      return interviewInviteColumnGenerator(
        modelName,
        user,
        openDeleteModal,
        queryKey
      );
    }, [user]);

    const getRows = useCallback(
      async (params) => {
        const { startRow, endRow, sortModel, filterModel } = params;
        ref?.current?.api.setGridOption("loading", true);
        const rowQueryKey = [
          ...queryKey,
          startRow,
          endRow,
          JSON.stringify(sortModel),
          JSON.stringify(filterModel),
          showFollowed,
        ];

        try {
          const data = await queryClient.fetchQuery({
            queryKey: rowQueryKey,
            queryFn: () =>
              services[modelName].getRowModel({
                startRow,
                endRow,
                sortModel,
                filterModel,
                showFollowed,
              }),
            staleTime: 5 * 60 * 1000,
          });
          ref?.current?.api.setGridOption("loading", false);
          if (data.items?.length === 0) {
            ref?.current?.api.showNoRowsOverlay();
          }

          params.successCallback(data.items, data.lastRow);
        } catch (error) {
          ref?.current?.api.setGridOption("loading", false);

          params.failCallback();
        } finally {
        }
      },
      [queryKey, queryClient, services, modelName, ref?.current]
    );

    const datasource = { getRows };

    // const [searchText, setSearchText] = useState("");

    // const onFilterTextBoxChanged = (value) => {
    //   if (ref.current) {
    //     ref.current.api.setGridOption("quickFilterText", value);
    //   }
    // };

    return (
      <div className={`mt-2 flex-1`}>
        <div className={`h-full flex flex-col`}>
          {/* <TextInput
          size="md"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.currentTarget.value);
            onFilterTextBoxChanged(e.currentTarget.value);
          }}
          className={`mb-2`}
        /> */}
          <div
            className={classNames(
              "ag-theme-quartz",
              "table-selector",
              "compact",
              "flex-1",
              {
                relative: !fullScreen,
                "max-size": fullScreen,
              }
            )}
          >
            <AgGridReact
              datasource={datasource}
              rowModelType="infinite"
              columnDefs={columnDefs}
              ref={ref}
              enableCellTextSelection={true}
              ensureDomOrder={true}
              modules={[InfiniteRowModelModule]}
              defaultColDef={{
                filterParams: {
                  maxNumConditions: 1,
                },
              }}
            />
            <Button
              className={`absolute bottom-6 right-6 max-sm:bottom-2 max-sm:right-2 px-3`}
              variant="default"
              onClick={() => setFullScreen((prev) => !prev)}
            >
              {fullScreen ? (
                <MdCloseFullscreen size={18} />
              ) : (
                <MdOutlineOpenInFull size={18} />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default InterviewInviteTableView;
