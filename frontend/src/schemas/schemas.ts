// Import other schemas as needed

import { z, ZodSchema } from "zod";
import { FormSchema } from "./schema";
import postIVCommunicationFormSchema from "@/schemas/postIVCommunicationFormSchema";
import lOIResponseFormSchema from "@/schemas/lOIResponseFormSchema";
import interviewImpressionFormSchema from "@/schemas/interviewImpressionFormSchema";
import questionFormSchema from "@/schemas/questionFormSchema";
import logisticsFormSchema from "@/schemas/logisticsFormSchema";
import secondLookFormSchema from "./secondLookFormSchema";
import droppedFormSchema from "./droppedFormSchema";
import fameShameFormSchema from "./fameShameFormSchema";
import m4InternImpressionFormSchema from "./m4InternImpressionFormSchema";
import malignantFormSchema from "./malignantFormSchema";
import scheduleDetailsFormSchema from "./scheduleDetailsFormSchema";
import fellowshipMatchFormSchema from "./fellowshipMatchFormSchema";
import XorYFormSchema from "./xorYFormSchema";

export const schemas: { [key: string]: FormSchema } = {
  interviewLogistics: logisticsFormSchema,
  question: questionFormSchema,
  interviewImpression: interviewImpressionFormSchema,
  lOIResponse: lOIResponseFormSchema,
  postIVCommunication: postIVCommunicationFormSchema,
  secondLook: secondLookFormSchema,
  dropped: droppedFormSchema,
  fameShame: fameShameFormSchema,
  m4InternImpression: m4InternImpressionFormSchema,
  malignant: malignantFormSchema,
  scheduleDetails: scheduleDetailsFormSchema,
  fellowshipMatch: fellowshipMatchFormSchema,
  xorY: XorYFormSchema,
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
