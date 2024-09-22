import { FormSchema } from "./schema";

const m4InternImpressionFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program for which this impression is recorded.",
    required: true,
  },
  positiveImpression: {
    type: "textarea",
    label: "Positive Impression",
    description: "Share any positive experiences during your M4 or internship.",
    placeholder:
      "e.g., Great teaching, supportive team, well-organized rotations",
  },
  negativeImpression: {
    type: "textarea",
    label: "Negative Impression",
    description: "Share any negative experiences during your M4 or internship.",
    placeholder: "e.g., Lack of guidance, long hours, disorganized scheduling",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
  },
};

export default m4InternImpressionFormSchema;
