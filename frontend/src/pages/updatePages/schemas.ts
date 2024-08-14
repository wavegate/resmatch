// Import other schemas as needed

import { z, ZodSchema } from "zod";
import { FormSchema } from "./schema";

const logisticsFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program to which this logistics information applies.",
    required: true,
  },
  schedulerPlatform: {
    type: "string",
    label: "Scheduler Platform",
    description: "The platform used for scheduling interviews.",
  },
  ivFormat: {
    type: "string",
    label: "Interview Format",
    description: "The format of the interview, such as in-person or virtual.",
  },
  timeSlots: {
    type: "string",
    label: "Time Slots",
    description: "The available time slots for interviews.",
  },
  ivPlatform: {
    type: "string",
    label: "Interview Platform",
    description:
      "The platform used to conduct the interview, e.g., Zoom or Microsoft Teams.",
  },
  openIVDates: {
    type: "multipleDates",
    label: "Open Interview Dates",
    description: "The dates when interviews are available for this program.",
    defaultValue: [],
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
    defaultValue: true,
  },
};

export const schemas: { [key: string]: FormSchema } = {
  interviewLogistics: logisticsFormSchema,
  // Add other schemas here with their corresponding model names as keys
};

// Utility function to generate Zod schema
export function generateZodSchema(schema: FormSchema): ZodSchema<any> {
  const zodShape: any = {};

  Object.keys(schema).forEach((key) => {
    const field = schema[key];

    switch (field.type) {
      case "string":
        zodShape[key] = z.string();
        if (!field.required) zodShape[key] = zodShape[key].optional();
        break;
      case "number":
        zodShape[key] = z.number({
          required_error: `${field.label || key} is required.`,
        });
        if (!field.required) zodShape[key] = zodShape[key].optional();
        break;
      case "boolean":
        zodShape[key] = z.boolean();
        if (!field.required) zodShape[key] = zodShape[key].optional();
        break;
      case "array":
        zodShape[key] = z.array(z.any());
        if (!field.required) zodShape[key] = zodShape[key].optional();
        break;
      case "multipleDates":
        zodShape[key] = z.date().array();
        if (!field.required) zodShape[key] = zodShape[key].optional();
        break;
      case "date":
        zodShape[key] = z.date();
        if (!field.required) zodShape[key] = zodShape[key].optional();
        break;
      case "programSearch":
        zodShape[key] = z.number({
          required_error: `${field.label || key} is required.`,
        });
        if (!field.required) zodShape[key] = zodShape[key].optional();
        break;
      default:
        zodShape[key] = z.any();
    }
  });

  return z.object(zodShape);
}
