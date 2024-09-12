import { Switch, Button } from "@mantine/core";
import { useRef, useCallback } from "react";
import USApplicantTableView from "./USApplicantTableView";
import USApplicantListView from "./USApplicantListView";

export default ({ listView, setListView }) => {
  const gridRef = useRef(null);

  const onBtnExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv();
  }, [gridRef.current]);

  return (
    <div className={`flex-1 flex flex-col`}>
      <div className={`inline-flex gap-x-6 gap-y-2 flex-wrap items-center`}>
        <Switch
          className={`text-nowrap`}
          label={"List view"}
          checked={listView}
          onChange={(event) => setListView(event.currentTarget.checked)}
          size="sm"
        />

        {!listView && (
          <Button
            size="compact-sm"
            className={`max-sm:hidden font-normal text-gray-800`}
            variant="subtle"
            onClick={onBtnExport}
          >
            Export as CSV
          </Button>
        )}
      </div>

      {listView && <USApplicantListView />}
      {!listView && <USApplicantTableView ref={gridRef} />}
    </div>
  );
};
