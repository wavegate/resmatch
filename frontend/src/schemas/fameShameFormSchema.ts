import { FormSchema } from "./schema";

const fameShameFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program to which this Fame/Shame applies.",
    required: true,
  },
  fame: {
    type: "textarea",
    label: "Fame",
    description: "Enter any positive experiences or praises about the program.",
    placeholder:
      "e.g., Great faculty, excellent training, supportive environment",
  },
  shame: {
    type: "textarea",
    label: "Shame",
    description:
      "Enter any negative experiences or criticisms about the program.",
    placeholder: "e.g., Poor work-life balance, lack of mentorship",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
  },
};

export default fameShameFormSchema;
