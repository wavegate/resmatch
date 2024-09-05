import { Switch } from "@mantine/core";
import { useState } from "react";
import ListView from "./ListView";
import TableView from "./TableView";

export default () => {
  const [listView, setListView] = useState(false);
  const [showAll, setShowAll] = useState(false);
  return (
    <div>
      <div className={`inline-flex gap-x-6 gap-y-2 flex-wrap`}>
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
      </div>

      {listView && <ListView />}
      {!listView && <TableView showAll={showAll} />}
    </div>
  );
};
