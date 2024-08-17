import { FormSchema } from "./schema";

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
  },
};

export default logisticsFormSchema;
