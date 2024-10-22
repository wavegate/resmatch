import useUser from "@/hooks/useUser";
import ListView from "@/pages/listPages/ListView";
import TableView from "@/pages/listPages/TableView";
import { Button, Checkbox, Switch } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import "./shrink.scss";

interface TableProps {
  modelName: string;
  className?: string;
}

const Table: React.FC<TableProps> = ({
  modelName,
  className,
  listView,
  setListView,
}) => {
  const { user } = useUser();
  const [showFollowed, setShowFollowed] = useState(false);
  const [showOldData, setShowOldData] = useState<boolean>(true);
  const gridRef = useRef(null);

  const onBtnExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv();
  }, [gridRef.current]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowFollowed(event.currentTarget.checked);
  };

  useEffect(() => {
    if (!user) {
      setShowFollowed(false);
    }
  }, [user]);

  const resetColumns = () => {
    if (gridRef.current) {
      gridRef.current.api.resetColumnState();
    }
    localStorage.removeItem(`columnState|${modelName}`);
    localStorage.setItem(`resettingColumnState`, "true");
    setTimeout(() => {
      localStorage.removeItem(`resettingColumnState`);
    }, 500);
  };

  const handleShowOldDataChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowOldData(event.currentTarget.checked);
  };

  return (
    <div className={`flex-1 flex flex-col`}>
      <div
        className={`inline-flex gap-x-6 max-sm:gap-x-3 gap-y-2 flex-wrap items-center`}
      >
        <Switch
          className={`text-nowrap shrink`}
          label={"List view"}
          checked={listView}
          onChange={(event) => setListView(event.currentTarget.checked)}
          size="sm"
        />
        <Checkbox
          className={`shrink`}
          label={"Show old data"}
          checked={showOldData}
          onChange={handleShowOldDataChange}
        />
        {user && (
          <Checkbox
            className={`shrink`}
            label={"Followed"}
            checked={showFollowed}
            onChange={handleCheckboxChange}
          />
        )}

        {!listView && (
          <Button
            size="compact-sm"
            className={`max-sm:hidden font-normal text-gray-800`}
            variant="subtle"
            onClick={resetColumns}
          >
            Reset columns
          </Button>
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

      {listView && (
        <ListView
          modelName={modelName}
          showFollowed={showFollowed}
          showOldData={showOldData}
        />
      )}
      {!listView && (
        <TableView
          ref={gridRef}
          modelName={modelName}
          showFollowed={showFollowed}
          showOldData={showOldData}
        />
      )}
    </div>
  );
};

export default Table;
