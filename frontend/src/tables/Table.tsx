import { useRef, useCallback } from "react";
import { Button, Switch } from "@mantine/core";
import { pageDescription } from "@/schemas/pageDescription";
import ListView from "@/pages/listPages/ListView";
import TableView from "@/pages/listPages/TableView";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

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
  const gridRef = useRef(null);
  const navigate = useNavigate();

  const onBtnExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv();
  }, [gridRef.current]);

  const labels = pageDescription[modelName];

  const shareUrl = `/${modelName}/add`;
  const shareText = `Share ${labels.singular}`;

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

        <Button
          onClick={() => navigate(shareUrl)}
          leftSection={<IoMdAdd size={18} />}
          visibleFrom="sm"
        >
          {shareText}
        </Button>
        <Button
          onClick={() => navigate(shareUrl)}
          leftSection={<IoMdAdd size={18} />}
          hiddenFrom="sm"
          size="xs"
        >
          {shareText}
        </Button>

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

      {listView && <ListView modelName={modelName} />}
      {!listView && <TableView ref={gridRef} modelName={modelName} />}
    </div>
  );
};

export default Table;
