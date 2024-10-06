import { FormSchema } from "./schema";

const interviewInviteFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "Select the program for this interview invite.",
    required: true,
    placeholder: "Search and select the program",
  },
  date: {
    type: "date",
    label: "Invite Date",
    description:
      "When did you receive the interview invite? Note: this is not the date of the scheduled interview. Please fill that information out over on the IV Logistics page.",
    placeholder: "Select the date and time",
    required: true,
  },
  import: true,
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
  geographicPreference: {
    type: "boolean",
    label: "Geographic Preference",
    description:
      "Did you select this program's region as a geographic preference?",
  },
  signal: {
    type: "boolean",
    label: "Program Signal",
    description: "Did you use a program signal for this program?",
  },
  signalTier: {
    type: "select",
    label: "Signal Tier",
    description: "Which tier signal?",
    conditions: { signal: true },
    placeholder: "Select Gold or Silver",
  },
  inState: {
    type: "boolean",
    label: "In-State",
    description: "Is this program in your home state?",
    conditions: { graduateType: "US" },
  },
  medicalDegree: {
    type: "select",
    label: "Medical Degree",
    description: "Is your degree MD or DO?",
    conditions: { graduateType: "US" },
    placeholder: "Select your medical degree",
  },
  visaRequired: {
    type: "boolean",
    label: "Visa Required",
    description: "Do you require a visa?",
    conditions: { graduateType: "IMG" },
  },
  subI: {
    type: "boolean",
    label: "Sub-Internship",
    description: "Did you complete a Sub-Internship at this program?",
  },
  home: {
    type: "boolean",
    label: "Home Institution",
    description: "Is this your home institution?",
    conditions: { graduateType: "US" },
  },
  greenCard: {
    type: "boolean",
    label: "Green Card",
    description: "Do you have a Green Card?",
    conditions: { graduateType: "IMG" },
  },
  away: {
    type: "boolean",
    label: "Away Rotation",
    description: "Did you complete an away rotation at this program?",
  },
  connection: {
    type: "string",
    label: "Program Connection",
    description:
      "Describe any professional or personal connections you may have to the program, such as a referral from a faculty member or a fellow.",
    placeholder: "Describe your connection, if any",
  },
  pstp: {
    type: "boolean",
    label: "PSTP",
    description: "Are you applying for a Physician-Scientist Training Program?",
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
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "Would you like to post this anonymously?",
  },
  save: {
    type: "boolean",
    label: "Save Info to Profile?",
    description:
      "This will update your profile with your stats for easier import next time.",
    defaultValue: true,
  },
};

export default interviewInviteFormSchema;
