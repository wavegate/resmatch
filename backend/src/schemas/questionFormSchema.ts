import { FormSchema } from "./schema.js";

const questionFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program to which these interview questions relate.",
    required: true,
  },
  questions: {
    type: "array",
    of: "string",
    label: "Questions",
    description: "List of interview questions that were asked.",
    placeholder: "Enter a question and press enter to add another...",
    required: true,
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
  },
};

export default questionFormSchema;
