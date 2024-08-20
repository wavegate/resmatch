import { FormSchema } from "./schema";

const userProfileFormSchema: FormSchema = {
  public: {
    type: "boolean",
    label: "Public Profile",
    description:
      "A public profile will show up on the Applicant Data tab for others to view. If your profile is not public, users will not be able to see your data, even if you link data to the profile.",
  },
  alias: {
    type: "string",
    label: "Alias",
    description: "Enter your alias to be displayed publicly.",
    placeholder: "Enter your alias",
  },
  graduateType: {
    type: "select",
    label: "Graduate Type",
    description:
      "Are you a U.S. graduate or an International Medical Graduate (IMG)?",
    placeholder: "Select your graduate type",
  },
  img: {
    type: "select",
    label: "IMG Type",
    description: "Are you a U.S. IMG or a Non-U.S. IMG?",
    conditions: { graduateType: "IMG" },
    placeholder: "Select your IMG type",
  },
  medicalDegree: {
    type: "select",
    label: "Medical Degree",
    description: "Is your degree MD or DO?",
    conditions: { graduateType: "US" },
    placeholder: "Select your medical degree",
  },
  schoolRanking: {
    type: "select",
    label: "School Ranking",
    description: "What's the rank of your school?",
    placeholder: "Select a school ranking",
  },
  classRank: {
    type: "select",
    label: "Class Rank",
    description: "What's your rank within your class?",
    placeholder: "Select a class rank",
  },
  visaRequired: {
    type: "boolean",
    label: "Visa Required",
    description: "Do you require a visa?",
    conditions: { graduateType: "IMG" },
  },
  greenCard: {
    type: "boolean",
    label: "Green Card",
    description: "Do you have a Green Card?",
    conditions: { graduateType: "IMG" },
  },
  monthsOfUSCE: {
    type: "number",
    label: "Months of US Clinical Experience",
    description: "Enter the number of months of U.S. clinical experience.",
    conditions: { graduateType: "IMG" },
    placeholder: "Enter the number of months",
  },
  ecfmgCertified: {
    type: "boolean",
    label: "ECFMG Certified",
    description: "Are you ECFMG certified?",
    conditions: { graduateType: "IMG" },
  },
  pstp: {
    type: "boolean",
    label: "PSTP",
    description: "Are you in the Physician-Scientist Training Program?",
  },
  step1ScorePass: {
    type: "boolean",
    label: "Step 1 Score Pass",
    description: "Did you pass Step 1?",
  },
  step1Score: {
    type: "number",
    label: "Step 1 Score",
    description:
      "Enter your Step 1 score. Ignore this field if you took Step 1 after the transition to Pass/Fail. Please enter an approximate score. Your score will be displayed as a bin (eg. 250 will be displayed as 250-254).",
    placeholder: "Enter your Step 1 score",
  },
  step2Score: {
    type: "number",
    label: "Step 2 Score",
    description:
      "Please enter an approximate score. Your score will be displayed as a bin (eg. 250 will be displayed as 250-254).",
    placeholder: "Enter your Step 2 score",
  },
  step2CSPathway: {
    type: "select",
    label: "Step 2 CS Pathway",
    description: "Which pathway are you for ECFMG certification?",
    conditions: {
      graduateType: "IMG",
    },
  },
  step3Score: {
    type: "number",
    label: "Step 3 Score",
    description:
      "Please enter an approximate score. Your score will be displayed as a bin (eg. 250 will be displayed as 250-254).",
    placeholder: "Enter your Step 3 score",
  },
  comlex1ScorePass: {
    type: "boolean",
    label: "COMLEX 1 Score Pass",
    description: "Did you pass COMLEX 1?",
    conditions: { medicalDegree: "DO" },
  },
  comlex2Score: {
    type: "number",
    label: "COMLEX 2 Score",
    description:
      "Please enter an approximate score. Your score will be displayed as a bin (eg. 532 will be displayed as 530-534).",
    conditions: { medicalDegree: "DO" },
    placeholder: "Enter your COMLEX 2 score",
  },
  redFlags: {
    type: "boolean",
    label: "Red Flags",
    description: "Do you have any red flags in your application?",
  },
  redFlagsExplanation: {
    type: "string",
    label: "Red Flags Explanation",
    description: "Please explain any red flags in your application.",
    conditions: { redFlags: true },
    placeholder: "Enter your explanation for red flags",
  },
  aoa: {
    type: "boolean",
    label: "AOA",
    description: "Are you part of Alpha Omega Alpha?",
    conditions: {
      graduateType: "US",
    },
  },
  sigmaSigmaPhi: {
    type: "boolean",
    label: "Sigma Sigma Phi",
    description: "Are you part of Sigma Sigma Phi?",
    conditions: {
      medicalDegree: "DO",
    },
  },
  goldHumanism: {
    type: "boolean",
    label: "Gold Humanism",
    description: "Are you part of Gold Humanism Honor Society?",
    conditions: {
      graduateType: "US",
    },
  },
  honors: {
    type: "number",
    label: "Honors",
    description:
      "Enter the number of Honors you received during medical school.",
    placeholder: "Enter the number of Honors",
  },
  highPass: {
    type: "number",
    label: "High Pass",
    description:
      "Enter the number of High Passes you received during medical school.",
    placeholder: "Enter the number of High Passes",
  },
  pass: {
    type: "number",
    label: "Pass",
    description:
      "Enter the number of Passes you received during medical school.",
    placeholder: "Enter the number of Passes",
  },
  fail: {
    type: "number",
    label: "Fail",
    description:
      "Enter the number of Fails you received during medical school.",
    placeholder: "Enter the number of Fails",
  },
  yearOfGraduation: {
    type: "number",
    label: "Year of Graduation",
    description: "Enter your year of graduation.",
    placeholder: "Enter your year of graduation",
  },
  numPublications: {
    type: "number",
    label: "Number of Publications",
    description: "Enter the number of publications you have.",
    placeholder: "Enter the number of publications",
  },
  numWorkExperiences: {
    type: "number",
    label: "Number of Work Experiences",
    description: "Enter the number of work experiences you have.",
    placeholder: "Enter the number of work experiences",
  },
  numVolunteerExperiences: {
    type: "number",
    label: "Number of Volunteer Experiences",
    description: "Enter the number of volunteer experiences you have.",
    placeholder: "Enter the number of volunteer experiences",
  },
  otherDegrees: {
    type: "string",
    label: "Other Degrees",
    description: "Enter any other degrees you have earned.",
    placeholder: "e.g., MBA",
  },
  numApplications: {
    type: "number",
    label: "Number of Applications",
    description:
      "Enter the total number of residency applications you submitted.",
    placeholder: "Enter the number of applications",
  },
  numInterviews: {
    type: "number",
    label: "Number of Interviews",
    description: "Enter the number of interview invitations you received.",
    placeholder: "Enter the number of interviews",
  },
  numWithdrawn: {
    type: "number",
    label: "Number of Withdrawn Applications",
    description: "Enter the number of applications you withdrew.",
    placeholder: "Enter the number of withdrawn applications",
  },
  numRejected: {
    type: "number",
    label: "Number of Rejections",
    description: "Enter the number of rejections you received.",
    placeholder: "Enter the number of rejections",
  },
  numWaitlisted: {
    type: "number",
    label: "Number of Waitlisted Programs",
    description: "Enter the number of programs where you were waitlisted.",
    placeholder: "Enter the number of waitlisted programs",
  },
  applicationYear: {
    type: "number",
    label: "Application Year",
    description: "Enter the year you applied for residency.",
    placeholder: "Enter the application year",
  },
};

export default userProfileFormSchema;
