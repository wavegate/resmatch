import {defaultFormSchema} from "@/schemas/defaultFormSchema.ts";
import {FormSchema} from "./schema";

const interviewRejectionFormSchema: FormSchema = {
  programId: {
    ...defaultFormSchema.programId,
    description: "Select the program for this interview invite.",
  },
  date: {
    ...defaultFormSchema.date,
    label: "Rejection Date & Time",
    description: "When did you receive the rejection?",
    width: "150px"
  },
  reason: {
    type: "string",
    label: "Reason",
    description:
      "If the program gave you a reason for the rejection, describe it here.",
    placeholder: "Describe the reason for the rejection, if any",
    width: "300px"
  },
  import: defaultFormSchema.import,
  graduateType: defaultFormSchema.graduateType,
  img: defaultFormSchema.img,
  geographicPreference: defaultFormSchema.geographicPreference,
  signal: {
    type: "boolean",
    label: "Program Signal",
    description: "Did you use a program signal for this program?",
    width: "150px"
  },
  inState: defaultFormSchema.inState,
  medicalDegree: defaultFormSchema.medicalDegree,
  visaRequired: defaultFormSchema.visaRequired,
  subI: defaultFormSchema.subI,
  home: defaultFormSchema.home,
  greenCard: defaultFormSchema.greenCard,
  away: defaultFormSchema.away,
  pstp: defaultFormSchema.pstp,
  step1ScorePass: defaultFormSchema.step1ScorePass,
  step1Score: defaultFormSchema.step1Score,
  step2Score: defaultFormSchema.step2Score,
  comlex1ScorePass: defaultFormSchema.comlex1ScorePass,
  comlex2Score: defaultFormSchema.comlex2Score,
  honors: defaultFormSchema.honors,
  highPass: defaultFormSchema.highPass,
  pass: defaultFormSchema.pass,
  fail: defaultFormSchema.fail,
  yearOfGraduation: defaultFormSchema.yearOfGraduation,
  anonymous: defaultFormSchema.anonymous,
  save: defaultFormSchema.save,
};

export default interviewRejectionFormSchema;
