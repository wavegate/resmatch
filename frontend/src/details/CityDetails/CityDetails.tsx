import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default ({ item }) => {
  return (
    <div>
      <Link to={`/program/${item.id}`}>
        <Button>Update program</Button>
      </Link>
      <div>{item.name}</div>
    </div>
  );
};
