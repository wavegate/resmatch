import { FormSchema } from "./schema";

const secondLookFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program associated with this second look.",
    required: true,
  },
  setting: {
    type: "select",
    label: "Setting",
    description:
      "The setting for the second look (e.g., virtual or in person).",
  },
  date: {
    type: "date",
    label: "Date",
    description: "The date of the second look. Please use US Eastern Time.",
    placeholder: "Pick a date",
  },
  bearingOnRank: {
    type: "string",
    label: "Bearing on Rank List",
    description: "Whether the second look affects the program's rank list.",
    placeholder: "e.g., Pre- or post-program rank list submission",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
  },
};

export default secondLookFormSchema;
