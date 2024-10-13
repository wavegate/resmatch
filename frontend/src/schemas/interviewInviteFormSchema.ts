import {defaultFormSchema} from "@/schemas/defaultFormSchema.ts";
import {FormSchema} from "./schema";

const interviewInviteFormSchema: FormSchema = {
  programId: {
    ...defaultFormSchema.programId,
    description: "Select the program for this interview invite.",
  },
  date: {
    ...defaultFormSchema.date,
    description: "When did you receive the interview invite? Note: this is not the date of the scheduled interview. Please fill that information out over on the IV Logistics page.",
  },
  import: defaultFormSchema.import,
  graduateType: defaultFormSchema.graduateType,
  img: defaultFormSchema.img,
  geographicPreference: defaultFormSchema.geographicPreference,
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
  inState: defaultFormSchema.inState,
  medicalDegree: defaultFormSchema.medicalDegree,
  visaRequired: defaultFormSchema.visaRequired,
  subI: defaultFormSchema.subI,
  home: defaultFormSchema.home,
  greenCard: defaultFormSchema.greenCard,
  away: defaultFormSchema.away,
  connection: {
    type: "string",
    label: "Program Connection",
    description:
      "Describe any professional or personal connections you may have to the program, such as a referral from a faculty member or a fellow.",
    placeholder: "Describe your connection, if any",
    width: '180px'
  },
  pstp: defaultFormSchema.pstp,
  step1ScorePass: defaultFormSchema.step1ScorePass,
  step1Score: defaultFormSchema.step1Score,
  step2Score: defaultFormSchema.step2Score,
  step3Score: defaultFormSchema.step3Score,
  comlex1ScorePass: defaultFormSchema.comlex1ScorePass,
  comlex2Score: defaultFormSchema.comlex2Score,
  aoa: defaultFormSchema.aoa,
  sigmaSigmaPhi: defaultFormSchema.sigmaSigmaPhi,
  goldHumanism: defaultFormSchema.goldHumanism,
  honors: defaultFormSchema.honors,
  highPass: defaultFormSchema.highPass,
  pass: defaultFormSchema.pass,
  fail: defaultFormSchema.fail,
  yearOfGraduation: defaultFormSchema.yearOfGraduation,
  anonymous: defaultFormSchema.anonymous,
  save: defaultFormSchema.save
};

export default interviewInviteFormSchema;
