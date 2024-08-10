import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default ({ item }) => {
  return (
    <div>
      <Link to={`/program/${item.id}`}>
        <Button>Update program</Button>
      </Link>
      <div>{item.nrmpProgramCode}</div>
      <div>{item.specialty.name}</div>
      <div>{item.institution.city?.name}</div>
      <div>{item.institution.city?.state}</div>
    </div>
  );
};
