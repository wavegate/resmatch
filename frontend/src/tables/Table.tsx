import useUser from "@/hooks/useUser";
import ListView from "@/pages/listPages/ListView";
import TableView from "@/pages/listPages/TableView";
import { Button, Checkbox, Switch } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";

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
        {user && (
          <Checkbox
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
            onClick={onBtnExport}
          >
            Export as CSV
          </Button>
        )}
      </div>

      {listView && (
        <ListView modelName={modelName} showFollowed={showFollowed} />
      )}
      {!listView && (
        <TableView
          ref={gridRef}
          modelName={modelName}
          showFollowed={showFollowed}
        />
      )}
    </div>
  );
};

export default Table;
