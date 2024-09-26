import { FormSchema } from "./schema"; // Adjust the import based on your project structure

const droppedFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program from which you dropped out.",
    required: true,
  },
  date: {
    type: "date",
    label: "Date Dropped",
    description: "The date you dropped the interview.",
    required: true,
  },
  dateOfInterviewCancelled: {
    type: "date",
    label: "Date of Interview Cancelled",
    description: "The date your interview was cancelled, if applicable.",
    required: false,
  },
  reason: {
    type: "string",
    label: "Reason",
    description: "The reason for dropping out of the program.",
    placeholder: "e.g., Received a better offer, personal reasons",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
  },
};

export default droppedFormSchema;
