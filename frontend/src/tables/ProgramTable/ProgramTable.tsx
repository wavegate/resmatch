import { Button, Switch } from "@mantine/core";
import { useCallback, useRef, useState } from "react";
import ProgramListView from "./ProgramListView";
import ProgramTableView from "./ProgramTableView";

export default ({ listView, setListView }) => {
  const [showAll, setShowAll] = useState(false);

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
          <Switch
            className={`text-nowrap`}
            label={"Show non-categorical"}
            checked={showAll}
            onChange={(event) => setShowAll(event.currentTarget.checked)}
            size="sm"
          />
        )}
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

      {listView && <ProgramListView />}
      {!listView && <ProgramTableView showAll={showAll} ref={gridRef} />}
    </div>
  );
};
