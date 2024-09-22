import { FormSchema } from "./schema";

const postIVCommunicationFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description:
      "The program to which this post-interview communication applies.",
    required: true,
  },
  communicationReceived: {
    type: "string",
    label: "Communication Received",
    description: "Details of any communication received after the interview.",
    placeholder: "e.g., Email, Phone Call, etc.",
  },
  thankYouLetterPolicy: {
    type: "select",
    label: "Thank You Letter Policy",
    description: "The program's policy on thank you letters.",
    placeholder: "e.g., Encouraged, Neutral, Discouraged, etc.",
  },
  rankImpact: {
    type: "boolean",
    label: "Rank Impact",
    description: "Did the communication impact your ranking?",
  },
  source: {
    type: "select",
    label: "Source",
    description: "The source of the post-interview communication.",
    placeholder: "e.g., Program Director, Resident, etc.",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
  },
};

export default postIVCommunicationFormSchema;
