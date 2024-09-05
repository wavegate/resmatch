import { Switch } from "@mantine/core";
import { useState } from "react";
import ListView from "./ListView";
import TableView from "./TableView";

export default () => {
  const [listView, setListView] = useState(false);

  return (
    <div>
      <Switch
        label={"List view"}
        className={`w-fit mb-4`}
        checked={listView}
        onChange={(event) => setListView(event.currentTarget.checked)}
        size="md"
      />

      {listView && <ListView />}
      {!listView && <TableView />}
    </div>
  );
};
