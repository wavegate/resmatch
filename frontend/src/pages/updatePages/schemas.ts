// Import other schemas as needed

import { z, ZodSchema } from "zod";
import { FormSchema } from "./schema";

export const fieldLabelMap: Record<string, Record<string, string>> = {
  schedulerPlatform: {
    THALAMUS: "Thalamus",
    ERAS: "ERAS",
    IV_BROKER: "IV Broker",
    INTERVIEW_BROKER: "Interview Broker",
    PROGRAM_EMAIL: "Program Email",
    ZOOM: "Zoom",
    REZRATE: "RezRate",
    PROGRAM_WEBSITE: "Program Website",
    COORDINATOR: "Coordinator",
  },
  ivPlatform: {
    ZOOM: "Zoom",
    THALAMUS: "Thalamus",
    WEBEX: "WebEx",
    IN_PERSON: "In-person",
    MICROSOFT_TEAMS: "Microsoft Teams",
    REZRATE: "RezRate",
    PANORAMAMD: "PanoramaMD",
    GOOGLE_MEET: "Google Meet",
    VIRTUAL: "Virtual",
  },
  // Add more mappings as needed for other fields...
};
const logisticsFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program to which this logistics information applies.",
    required: true,
  },
  schedulerPlatform: {
    type: "select",
    label: "Scheduler Platform",
    description: "The platform used for scheduling interviews.",
  },
  ivFormat: {
    type: "string",
    label: "Interview Format",
    description: "The format of the interview, such as in-person or virtual.",
    placeholder:
      "e.g., Three 20-minute interviews with faculty via Zoom, followed by a 30-minute group discussion with residents",
  },
  timeSlots: {
    type: "string",
    label: "Time Slots",
    description: "The available time slots for interviews.",
    placeholder:
      "e.g., AM slots: 8:00 AM - 12:00 PM, PM slots: 1:00 PM - 5:00 PM",
  },
  ivPlatform: {
    type: "select",
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

export function generateZodSchema(schema: FormSchema): ZodSchema<any> {
  const zodShape: any = {};

  Object.keys(schema).forEach((key) => {
    const field = schema[key];

    switch (field.type) {
      case "string":
        if (field.options) {
          // Extract the allowed values from options for enum-like validation
          const allowedValues = field.options.map((option) => option.value);
          zodShape[key] = z.enum(allowedValues as [string, ...string[]]);
        } else {
          zodShape[key] = z.string();
        }
        if (!field.required) zodShape[key] = zodShape[key].optional();
        break;

      case "number":
        zodShape[key] = z.number();
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
        zodShape[key] = z.number();
        if (!field.required) zodShape[key] = zodShape[key].optional();
        break;

      default:
        zodShape[key] = z.any();
    }
  });

  return z.object(zodShape);
}
