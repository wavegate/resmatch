import {FormSchema} from "@/schemas/schema.ts";

export const defaultFormSchema: FormSchema = {
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
    required: true,
    placeholder: "Select the date and time",
    width: "120px",
  },
  graduateType: {
    type: "select",
    label: "Graduate Type",
    description:
      "Are you a U.S. graduate or an International Medical Graduate (IMG)?",
    placeholder: "Select your graduate type",
    width: "140px",
  },
  img: {
    type: "select",
    label: "IMG Type",
    description: "Are you a U.S. IMG or a Non-U.S. IMG?",
    conditions: {graduateType: "IMG"},
    placeholder: "Select your IMG type",
    width: "130px",
  },
  geographicPreference: {
    type: "boolean",
    label: "Geographic Preference",
    description:
      "Did you select this program's region as a geographic preference?",
    width: '160px'
  },
  signalTier: {
    type: "select",
    label: "Signal",
    description: "Select if you used a signal for this program.",
    // conditions: { signal: true },
    placeholder: "Select signal",
    width: "125px",
  },
  numSpotsLeft: {
    type: "number",
    label: "Number of Spots Left",
    description:
      "If available, please share approximately how many spots are still open.",
    placeholder: "Enter number of spots left.",
    width: '165px'
  },
  inState: {
    type: "boolean",
    label: "In-State",
    description: "Is this program in your home state?",
    conditions: {graduateType: "US"},
    width: "95px",
  },
  medicalDegree: {
    type: "select",
    label: "Medical Degree",
    description: "Is your degree MD or DO?",
    conditions: {graduateType: "US"},
    placeholder: "Select your medical degree",
    width: "150px",
  },
  visaRequired: {
    type: "boolean",
    label: "Visa Required",
    description: "Do you require a visa?",
    conditions: {graduateType: "IMG"},
    width: "135px",
  },
  subI: {
    type: "boolean",
    label: "Sub-Internship",
    description: "Did you complete a Sub-Internship at this program?",
    width: "140px",
  },
  home: {
    type: "boolean",
    label: "Home Institution",
    description: "Is this your home institution?",
    conditions: {graduateType: "US"},
    width: "150px",
  },
  greenCard: {
    type: "boolean",
    label: "Green Card",
    description: "Do you have a Green Card?",
    conditions: {graduateType: "IMG"},
    width: "120px",
  },
  away: {
    type: "boolean",
    label: "Away Rotation",
    description: "Did you complete an away rotation at this program?",
    width: "140px",
  },
  connection: {
    type: "string",
    label: "Program Connection",
    description:
      "Describe any professional or personal connections you may have to the program, such as a referral from a faculty member or a fellow.",
    placeholder: "Describe your connection, if any",
    width: '180px'
  },
  pstp: {
    type: "boolean",
    label: "PSTP",
    description: "Are you applying for a Physician-Scientist Training Program?",
    width: "80px",
  },
  step1ScorePass: {
    type: "boolean",
    label: "Step 1 Score Pass",
    description: "Did you pass Step 1?",
    width: "160px",
  },
  step1Score: {
    type: "number",
    label: "Step 1 Score",
    description:
      "Enter your Step 1 score. Ignore this field if you took Step 1 after the transition to Pass/Fail. Please enter an approximate score. Your score will be displayed as a bin (eg. 250 will be displayed as 250-254).",
    placeholder: "Enter your Step 1 score",
    width: "125px",
  },
  step2Score: {
    type: "number",
    label: "Step 2 Score",
    description:
      "Please enter an approximate score. Your score will be displayed as a bin (eg. 250 will be displayed as 250-254).",
    placeholder: "Enter your Step 2 score",
    width: "125px",
  },
  step3Score: {
    type: "number",
    label: "Step 3 Score",
    description:
      "Please enter an approximate score. Your score will be displayed as a bin (eg. 250 will be displayed as 250-254).",
    placeholder: "Enter your Step 3 score",
    width: "125px",
  },
  comlex1ScorePass: {
    type: "boolean",
    label: "COMLEX 1 Score Pass",
    description: "Did you pass COMLEX 1?",
    conditions: {medicalDegree: "DO"},
    width: '190px'
  },
  comlex2Score: {
    type: "number",
    label: "COMLEX 2 Score",
    description:
      "Please enter an approximate score. Your score will be displayed as a bin (eg. 532 will be displayed as 530-534).",
    conditions: {medicalDegree: "DO"},
    placeholder: "Enter your COMLEX 2 score",
    width: '160px'
  },
  aoa: {
    type: "boolean",
    label: "AOA",
    description: "Are you part of Alpha Omega Alpha?",
    conditions: {
      graduateType: "US",
    },
    width: "70px",
  },
  sigmaSigmaPhi: {
    type: "boolean",
    label: "Sigma Sigma Phi",
    description: "Are you part of Sigma Sigma Phi?",
    conditions: {
      medicalDegree: "DO",
    },
    width: "155px",
  },
  goldHumanism: {
    type: "boolean",
    label: "Gold Humanism",
    description: "Are you part of Gold Humanism Honor Society?",
    conditions: {
      graduateType: "US",
    },
    width: "145px",
  },
  honors: {
    type: "number",
    label: "Honors",
    description:
      "Enter the number of Honors you received during medical school.",
    placeholder: "Enter the number of Honors",
    width: "90px",
  },
  highPass: {
    type: "number",
    label: "High Pass",
    description:
      "Enter the number of High Passes you received during medical school.",
    placeholder: "Enter the number of High Passes",
    width: "110px",
  },
  pass: {
    type: "number",
    label: "Pass",
    description:
      "Enter the number of Passes you received during medical school.",
    placeholder: "Enter the number of Passes",
    width: "80px",
  },
  fail: {
    type: "number",
    label: "Fail",
    description:
      "Enter the number of Fails you received during medical school.",
    placeholder: "Enter the number of Fails",
    width: "70px",
  },
  yearOfGraduation: {
    type: "number",
    label: "Year of Graduation",
    description: "Enter your year of graduation.",
    placeholder: "Enter your year of graduation",
    width: '170px'
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
      "This will update your profile with the new stats you provided on this form.",
    defaultValue: true,
  },
}