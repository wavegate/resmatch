import { FormSchema } from "./schema";

const lOIResponseFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program to which this LOI response applies.",
    required: true,
  },
  intent: {
    type: "boolean",
    label: "Intent?",
    description: "Select if this was a letter of intent.",
  },
  sentTo: {
    type: "select",
    label: "Sent To",
    description: "To whom was the letter sent to?",
    placeholder: "e.g., Program Director, Coordinator, etc.",
  },
  dateSent: {
    type: "date",
    label: "Date Sent",
    description: "The date the letter was sent.",
  },
  response: {
    type: "boolean",
    label: "Received Response",
    description: "Did you receive a response to your letter?",
  },
  responseTone: {
    type: "select",
    label: "Response Tone",
    description: "The tone of the response received.",
    placeholder: "e.g., Positive, Neutral, Negative, etc.",
  },
  timeBetweenSentAndResponse: {
    type: "string",
    label: "Time Between Sent and Response",
    description: "The time between sending the LOI and receiving a response.",
    placeholder: "e.g., 3 days, 1 week, etc.",
  },
  mentionedTopChoice: {
    type: "boolean",
    label: "Mentioned as Top Choice",
    description: "Did you mention top choice or #1 choice?",
  },
  comments: {
    type: "comments",
    label: "Comments",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
  },
};

export default lOIResponseFormSchema;
