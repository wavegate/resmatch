import { FormSchema } from "./schema";

const malignantFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program to which this report applies.",
    required: true,
  },
  malignant: {
    type: "select",
    label: "Malignant",
    description: "Indicate whether the program is malignant.",
    required: true,
  },
  source: {
    type: "string",
    label: "Source",
    description: "The source of this information (e.g., MS4, resident).",
    placeholder: "e.g., Resident, Intern, MS4",
  },
  explanation: {
    type: "textarea",
    label: "Explanation",
    description: "Provide an explanation for the malignant label, if any.",
    placeholder:
      "e.g., The residents mentioned lack of support and high burnout rates.",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
    defaultValue: true,
  },
};

export default malignantFormSchema;
