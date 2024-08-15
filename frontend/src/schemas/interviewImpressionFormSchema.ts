import { FormSchema } from "./schema";

const interviewImpressionFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program to which this interview impression applies.",
    required: true,
  },
  positives: {
    type: "textarea",
    label: "Positives",
    description: "Positive aspects of the interview experience.",
    placeholder: "e.g., Friendly interviewers, organized schedule, etc.",
  },
  negatives: {
    type: "textarea",
    label: "Negatives",
    description: "Negative aspects of the interview experience.",
    placeholder: "e.g., Long wait times, unfriendly staff, etc.",
  },
  howInterviewDayAffectsRank: {
    type: "select",
    label: "Impact on Ranking",
    description:
      "How the interview day influenced your ranking of the program.",
    placeholder: "e.g., Increased ranking due to positive experience.",
  },
  gift: {
    type: "string",
    label: "Gift",
    description: "Details about any gift received during the interview.",
    placeholder: "e.g., Branded pen, tote bag, etc.",
  },
  timeGiftReceived: {
    type: "string",
    label: "Time Gift Received",
    description: "When the gift was received during the interview day.",
    placeholder: "e.g., At the beginning of the day, after lunch, etc.",
  },
  comments: {
    type: "comments",
    label: "Comments",
    description: "Additional comments or feedback.",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
    defaultValue: true,
  },
};

export default interviewImpressionFormSchema;
