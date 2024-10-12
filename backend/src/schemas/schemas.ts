import cityUserInputFormSchema from "./cityUserInputFormSchema.js";
import droppedFormSchema from "./droppedFormSchema.js";
import fameShameFormSchema from "./fameShameFormSchema.js";
import fellowshipMatchFormSchema from "./fellowshipMatchFormSchema.js";
import interviewImpressionFormSchema from "./interviewImpressionFormSchema.js";
import interviewInviteFormSchema from "./interviewInviteFormSchema.js";
import interviewRejectionFormSchema from "./interviewRejectionFormSchema.js";
import logisticsFormSchema from "./logisticsFormSchema.js";
import lOIResponseFormSchema from "./lOIResponseFormSchema.js";
import m4InternImpressionFormSchema from "./m4InternImpressionFormSchema.js";
import malignantFormSchema from "./malignantFormSchema.js";
import postIVCommunicationFormSchema from "./postIVCommunicationFormSchema.js";
import questionFormSchema from "./questionFormSchema.js";
import scheduleDetailsFormSchema from "./scheduleDetailsFormSchema.js";
import { FormSchema } from "./schema.js";
import secondLookFormSchema from "./secondLookFormSchema.js";
import XorYFormSchema from "./xorYFormSchema.js";

export const schemas: { [key: string]: FormSchema } = {
  interviewLogistics: logisticsFormSchema,
  question: questionFormSchema,
  interviewImpression: interviewImpressionFormSchema,
  lOIResponse: lOIResponseFormSchema,
  postIVCommunication: postIVCommunicationFormSchema,
  secondLook: secondLookFormSchema,
  dropped: droppedFormSchema,
  fameShame: fameShameFormSchema,
  m4InternImpression: m4InternImpressionFormSchema,
  malignant: malignantFormSchema,
  scheduleDetails: scheduleDetailsFormSchema,
  fellowshipMatch: fellowshipMatchFormSchema,
  xorY: XorYFormSchema,
  interviewInvite: interviewInviteFormSchema,
  interviewRejection: interviewRejectionFormSchema,
  cityUserInput: cityUserInputFormSchema,
  // Add other schemas here with their corresponding model names as keys
};

export const filtersMap = {
  interviewInvite: ["program", "startDate", "endDate"],
  interviewRejection: ["program", "startDate", "endDate"],
  dropped: ["program", "startDate", "endDate"],
};
