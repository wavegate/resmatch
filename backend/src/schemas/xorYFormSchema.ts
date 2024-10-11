import { FormSchema } from "./schema.js";

const XorYFormSchema: FormSchema = {
  programXId: {
    type: "programSearch",
    label: "Program X",
    description: "The first program in the comparison.",
    required: true,
  },
  programYId: {
    type: "programSearch",
    label: "Program Y",
    description: "The second program in the comparison.",
    required: true,
  },
  question: {
    type: "string",
    label: "Question",
    description:
      "The specific question or comparison between Program X and Program Y.",
    placeholder: "e.g., Which program offers better research opportunities?",
    required: true,
  },
  img: {
    type: "boolean",
    label: "IMG",
    description: "Are you an IMG applicant?",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "Post this comparison anonymously.",
  },
};

export default XorYFormSchema;
