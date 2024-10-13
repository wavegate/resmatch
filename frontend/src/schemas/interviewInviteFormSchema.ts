import {defaultFormSchema} from "@/schemas/defaultFormSchema.ts";
import {FormSchema} from "./schema";

const interviewInviteFormSchema: FormSchema = {
  programId: defaultFormSchema.programId,
  date: defaultFormSchema.date,
  graduateType: defaultFormSchema.graduateType,
  img: defaultFormSchema.img,
  geographicPreference: defaultFormSchema.geographicPreference,
  signalTier: defaultFormSchema.signalTier,
  numSpotsLeft: defaultFormSchema.numSpotsLeft,
  inState: defaultFormSchema.inState,
  medicalDegree: defaultFormSchema.medicalDegree,
  visaRequired: defaultFormSchema.visaRequired,
  subI: defaultFormSchema.subI,
  home: defaultFormSchema.home,
  greenCard: defaultFormSchema.greenCard,
  away: defaultFormSchema.away,
  connection: defaultFormSchema.connection,
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
