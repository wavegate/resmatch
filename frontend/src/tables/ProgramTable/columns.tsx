import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import programName from "@/utils/programName";
import { convertToBinnedValue } from "@/utils/utils";
import { Link } from "react-router-dom";

export const columnDefs = [
  {
    headerName: "Name",
    field: "name",
    filter: true,
  },
  {
    headerName: "Institution",
    field: "institution.name",
    filter: true,
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
  // { headerName: "Graduate Type", field: "graduateType" },
  // { headerName: "IMG Type", field: "img" },
  // { headerName: "Medical Degree", field: "medicalDegree" },
  // {
  //   headerName: "School Ranking",
  //   field: "schoolRanking",
  //   valueFormatter: ({ value }) => fieldLabelMap["schoolRanking"][value],
  // },
  // {
  //   headerName: "Class Rank",
  //   field: "classRank",
  //   valueFormatter: ({ value }) => fieldLabelMap["classRank"][value],
  // },
  // // {
  // //   headerName: "Visa Required",
  // //   field: "visaRequired",
  // // },
  // // {
  // //   headerName: "Green Card",
  // //   field: "greenCard",
  // // },
  // // { headerName: "Months of USCE", field: "monthsOfUSCE" },
  // // {
  // //   headerName: "ECFMG Certified",
  // //   field: "ecfmgCertified",
  // // },
  // // { headerName: "Step 1 Score Pass", field: "step1ScorePass" },
  // // { headerName: "Step 1 Score", field: "step1Score" },
  // {
  //   headerName: "Step 2 Score",
  //   field: "step2Score",
  //   valueFormatter: ({ value }) => convertToBinnedValue(value),
  // },
  // // { headerName: "COMLEX 1 Score Pass", field: "comlex1ScorePass" },
  // {
  //   headerName: "COMLEX 2 Score",
  //   field: "comlex2Score",
  //   valueFormatter: ({ value }) => convertToBinnedValue(value),
  // },
  // { headerName: "Red Flags", field: "redFlags" },
  // { headerName: "Red Flags Explanation", field: "redFlagsExplanation" },
  // { headerName: "Honors", field: "honors" },
  // { headerName: "High Pass", field: "highPass" },
  // { headerName: "Pass", field: "pass" },
  // { headerName: "Fail", field: "fail" },
  // { headerName: "AOA", field: "aoa" },
  // { headerName: "Sigma Sigma Phi", field: "sigmaSigmaPhi" },
  // { headerName: "Gold Humanism", field: "goldHumanism" },
  // { headerName: "Year of Graduation", field: "yearOfGraduation" },
  // { headerName: "# Publications", field: "numPublications" },
  // { headerName: "# Work Experiences", field: "numWorkExperiences" },
  // {
  //   headerName: "Number of Volunteer Experiences",
  //   field: "numVolunteerExperiences",
  // },
  // { headerName: "Other Degrees", field: "otherDegrees" },
  // { headerName: "PSTP", field: "pstp" },
  // { headerName: "# Applications", field: "numApplications" },
  // { headerName: "# Interviews", field: "numInterviews" },
  // { headerName: "# Withdrawn Applications", field: "numWithdrawn" },
  // { headerName: "# Rejections", field: "numRejected" },
  // { headerName: "# Waitlisted Programs", field: "numWaitlisted" },
  // { headerName: "Application Year", field: "applicationYear" },
];
