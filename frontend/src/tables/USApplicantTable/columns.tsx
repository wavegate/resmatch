import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import { convertToBinnedValue } from "@/utils/utils";
import { Link } from "react-router-dom";

// Example columns array for the Mantine DataTable
export const columns = [
  {
    accessor: "alias",
    title: "Alias",
    render: ({ id, alias }) => (
      <Link to={`/user/${id}`} className={`underline`}>
        {alias}
      </Link>
    ),
  },
  // { accessor: "graduateType", title: "Graduate Type" },
  // { accessor: "img", title: "IMG Type" },
  { accessor: "medicalDegree", title: "Medical Degree" },
  {
    accessor: "schoolRanking",
    title: "School Ranking",
    render: ({ schoolRanking }) => {
      return fieldLabelMap["schoolRanking"][schoolRanking];
    },
  },
  {
    accessor: "classRank",
    title: "Class Rank",
    render: ({ classRank }) => {
      return fieldLabelMap["classRank"][classRank];
    },
  },
  // {
  //   accessor: "visaRequired",
  //   title: "Visa Required",
  // },
  // {
  //   accessor: "greenCard",
  //   title: "Green Card",
  // },
  // { accessor: "monthsOfUSCE", title: "Months of USCE" },
  // {
  //   accessor: "ecfmgCertified",
  //   title: "ECFMG Certified",
  // },

  // { accessor: "step1ScorePass", title: "Step 1 Score Pass" },
  // { accessor: "step1Score", title: "Step 1 Score" },
  { accessor: "step2Score", title: "Step 2 Score" },
  // { accessor: "comlex1ScorePass", title: "COMLEX 1 Score Pass" },
  { accessor: "comlex2Score", title: "COMLEX 2 Score" },
  { accessor: "redFlags", title: "Red Flags" },
  { accessor: "redFlagsExplanation", title: "Red Flags Explanation" },
  { accessor: "honors", title: "Honors" },
  { accessor: "highPass", title: "High Pass" },
  { accessor: "pass", title: "Pass" },
  { accessor: "fail", title: "Fail" },
  { accessor: "aoa" },
  { accessor: "sigmaSigmaPhi" },
  { accessor: "goldHumanism" },
  { accessor: "yearOfGraduation", title: "Year of Graduation" },
  { accessor: "numPublications", title: "# Publications" },
  { accessor: "numWorkExperiences", title: "# Work Experiences" },
  {
    accessor: "numVolunteerExperiences",
    title: "Number of Volunteer Experiences",
  },
  { accessor: "otherDegrees", title: "Other Degrees" },
  { accessor: "mstp", title: "MSTP" },
  { accessor: "numApplications", title: "# Applications" },
  { accessor: "numInterviews", title: "# Interviews" },
  { accessor: "numWithdrawn", title: "# Withdrawn Applications" },
  { accessor: "numRejected", title: "# Rejections" },
  { accessor: "numWaitlisted", title: "# Waitlisted Programs" },
  { accessor: "applicationYear", title: "Application Year" },
];

export const columnDefs = [
  {
    headerName: "Alias",
    field: "alias",
    cellRenderer: ({ data }) => (
      <Link to={`/user/${data.id}`} className={`underline`}>
        {data.alias}
      </Link>
    ),
  },
  // { headerName: "Graduate Type", field: "graduateType" },
  // { headerName: "IMG Type", field: "img" },
  { headerName: "Medical Degree", field: "medicalDegree" },
  {
    headerName: "School Ranking",
    field: "schoolRanking",
    valueFormatter: ({ value }) => fieldLabelMap["schoolRanking"][value],
  },
  {
    headerName: "Class Rank",
    field: "classRank",
    valueFormatter: ({ value }) => fieldLabelMap["classRank"][value],
  },
  // {
  //   headerName: "Visa Required",
  //   field: "visaRequired",
  // },
  // {
  //   headerName: "Green Card",
  //   field: "greenCard",
  // },
  // { headerName: "Months of USCE", field: "monthsOfUSCE" },
  // {
  //   headerName: "ECFMG Certified",
  //   field: "ecfmgCertified",
  // },
  // { headerName: "Step 1 Score Pass", field: "step1ScorePass" },
  // { headerName: "Step 1 Score", field: "step1Score" },
  {
    headerName: "Step 2 Score",
    field: "step2Score",
    valueFormatter: ({ value }) => convertToBinnedValue(value),
  },
  // { headerName: "COMLEX 1 Score Pass", field: "comlex1ScorePass" },
  {
    headerName: "COMLEX 2 Score",
    field: "comlex2Score",
    valueFormatter: ({ value }) => convertToBinnedValue(value),
  },
  {
    headerName: "Red Flags",
    field: "redFlags",
    cellDataType: "text",
    valueFormatter: (params) => {
      if (params.value === true) {
        return "Yes";
      } else if (params.value === false) {
        return "No";
      } else {
        return "";
      }
    },
  },
  { headerName: "Red Flags Explanation", field: "redFlagsExplanation" },
  { headerName: "Honors", field: "honors" },
  { headerName: "High Pass", field: "highPass" },
  { headerName: "Pass", field: "pass" },
  { headerName: "Fail", field: "fail" },
  {
    headerName: "AOA",
    field: "aoa",
    cellDataType: "text",
    valueFormatter: (params) => {
      if (params.value === true) {
        return "Yes";
      } else if (params.value === false) {
        return "No";
      } else {
        return "";
      }
    },
  },
  {
    headerName: "Sigma Sigma Phi",
    field: "sigmaSigmaPhi",
    cellDataType: "text",
    valueFormatter: (params) => {
      if (params.value === true) {
        return "Yes";
      } else if (params.value === false) {
        return "No";
      } else {
        return "";
      }
    },
  },
  {
    headerName: "Gold Humanism",
    field: "goldHumanism",
    cellDataType: "text",
    valueFormatter: (params) => {
      if (params.value === true) {
        return "Yes";
      } else if (params.value === false) {
        return "No";
      } else {
        return "";
      }
    },
  },
  { headerName: "Year of Graduation", field: "yearOfGraduation" },
  { headerName: "# Publications", field: "numPublications" },
  { headerName: "# Work Experiences", field: "numWorkExperiences" },
  {
    headerName: "Number of Volunteer Experiences",
    field: "numVolunteerExperiences",
  },
  { headerName: "Other Degrees", field: "otherDegrees" },
  {
    headerName: "MSTP",
    field: "mstp",
    cellDataType: "text",
    valueFormatter: (params) => {
      if (params.value === true) {
        return "Yes";
      } else if (params.value === false) {
        return "No";
      } else {
        return "";
      }
    },
  },
  { headerName: "# Applications", field: "numApplications" },
  { headerName: "# Interviews", field: "numInterviews" },
  { headerName: "# Withdrawn Applications", field: "numWithdrawn" },
  { headerName: "# Rejections", field: "numRejected" },
  { headerName: "# Waitlisted Programs", field: "numWaitlisted" },
  { headerName: "Application Year", field: "applicationYear" },
];
