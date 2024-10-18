import interviewInviteFormSchema from "./interviewInviteFormSchema.js";
import { FormSchema } from "./schema.js";

export const schemas: { [key: string]: FormSchema } = {
  interviewInvite: interviewInviteFormSchema,
};

export const filtersMap = {
  interviewInvite: ["program", "startDate", "endDate"],
  interviewRejection: ["program", "startDate", "endDate"],
  dropped: ["program", "startDate", "endDate"],
};
