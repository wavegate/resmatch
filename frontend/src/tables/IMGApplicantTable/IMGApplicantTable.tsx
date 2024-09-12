import { Button, Switch } from "@mantine/core";
import { useRef, useCallback } from "react";
import IMGApplicantListView from "./IMGApplicantListView";
import IMGApplicantTableView from "./IMGApplicantTableView";

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

      {listView && <IMGApplicantListView />}
      {!listView && <IMGApplicantTableView ref={gridRef} />}
    </div>
  );
};
