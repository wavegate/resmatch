import programName from "@/utils/programName";

export const columnDefs = [
  // {
  //   headerName: "Name",
  //   field: "name",
  //   filter: true,
  // },
  // {
  //   headerName: "Institution",
  //   field: "institution.name",
  //   filter: true,
  // },
  {
    headerName: "Name",
    valueGetter: (p) => {
      return programName(p.data);
    },
  },
  {
    headerName: "City",
    field: "city.name",
    filter: true,
  },
  {
    headerName: "State",
    field: "city.state",
    filter: true,
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
