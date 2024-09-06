import { Button, Loader, TextInput } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, forwardRef, useMemo, useEffect } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import { columns } from "./columns";
import { AgGridReact } from "ag-grid-react";
import services from "@/services/services";
import { columnGenerator } from "./columns";
import useUser from "@/hooks/useUser";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { pageDescription } from "@/schemas/pageDescription";
import classNames from "classnames";
import { MdCloseFullscreen, MdOutlineOpenInFull } from "react-icons/md";

const TableView = forwardRef(({ modelName }, ref) => {
  const queryClient = useQueryClient();

  const [fullScreen, setFullScreen] = useState(false);

  const labels = pageDescription[modelName];

  // Mutation for deleting the entry
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
      title: `Delete this ${labels.singular}?`,
      centered: true,
      children: <div>This action cannot be reversed.</div>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteMutation.mutate(id);
      },
    });

  const queryKey = [modelName, "all"];
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => services[modelName].getAll(),
  });

  const { user } = useUser();
  const columnDefs = useMemo(() => {
    return columnGenerator(modelName, user, openDeleteModal, queryKey);
  }, [user]);

  const [searchText, setSearchText] = useState("");

  const onFilterTextBoxChanged = (value) => {
    if (ref.current) {
      ref.current.api.setGridOption("quickFilterText", value);
    }
  };

  return (
    <div className={`mt-2 flex-1`}>
      {isLoading && (
        <div className={`flex flex-col items-center`}>
          <Loader color="blue" className={`mt-12`} />
        </div>
      )}
      {!!data?.items?.length && (
        <div className={`h-full flex flex-col`}>
          <TextInput
            size="md"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.currentTarget.value);
              onFilterTextBoxChanged(e.currentTarget.value);
            }}
            className={`mb-2`}
          />
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
              rowData={data?.items}
              columnDefs={columnDefs}
              ref={ref}
              enableCellTextSelection={true}
              ensureDomOrder={true}
            />
            <Button
              className={`absolute bottom-6 right-6 px-3`}
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
          <div className={`mt-2 text-sm`}>
            Showing {data?.items?.length} of {data?.items?.length}
          </div>
        </div>
      )}
      {data?.items && data?.items.length === 0 && <NoRecords />}
    </div>
  );
});

export default TableView;
