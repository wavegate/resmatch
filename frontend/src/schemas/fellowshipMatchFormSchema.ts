import { FormSchema } from "./schema";

const fellowshipMatchFormSchema: FormSchema = {
  year: {
    type: "number",
    label: "Match Year",
    description:
      "The year when the fellowship match occurred (e.g., 2025 means 2024-2025).",
    required: true,
  },
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program to which this fellowship match applies.",
    required: true,
  },
  matchData: {
    type: "textarea",
    label: "Match Data",
    description:
      "Enter details about the fellowship match, including specialties and institutions (e.g., Nephrology x 1 to USC).",
    placeholder: "e.g., Nephrology x 1 to USC",
    required: true,
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "Post this information anonymously.",
    defaultValue: true,
  },
};

export default fellowshipMatchFormSchema;
