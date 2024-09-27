import FollowProgram from "@/components/FollowProgram";
import programName from "@/utils/programName";
import { Link } from "react-router-dom";

export const columnDefs = (user) => [
  {
    headerName: "Follow",
    width: "120px",
    valueGetter: ({ data }) => {
      return user?.followedPrograms?.some((x) => x.id === data.id);
    },
    cellRenderer: ({ data }) => {
      return (
        <div className={`mt-2`}>
          <FollowProgram programId={data.id} />
        </div>
      );
    },
    hide: !user,
  },
  {
    headerName: "Name",
    valueGetter: (p) => {
      return programName(p.data);
    },
    cellRenderer: ({ data }) => {
      return (
        <Link to={`/program/${data.id}/details`} className={`hover:underline`}>
          {programName(data)}
        </Link>
      );
    },
  },
  {
    headerName: "State",
    field: "city.state",
    filter: true,
  },
  {
    headerName: "City",
    field: "city.name",
    filter: true,
  },
  {
    headerName: "Program Type",
    valueGetter: (p) => {
      const item = p.data;

      const secondLastChar = item.nrmpProgramCode.slice(-2, -1); // Get the second-to-last character
      if (secondLastChar === "C") {
        return "Categorical";
      } else if (secondLastChar === "P") {
        return "Preliminary";
      } else if (secondLastChar === "M") {
        return "Primary";
      } else {
        return ""; // Return an empty string if no match
      }
    },
  },
  {
    headerName: "NRMP Program Code",
    field: "nrmpProgramCode",
    filter: true,
  },
  {
    headerName: "ACGME Code",
    field: "acgmeCode",
    filter: true,
  },
];
