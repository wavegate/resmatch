import { FormSchema } from "./schema";

const scheduleDetailsFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "The program associated with these schedule details.",
    required: true,
  },
  longOvernightCall: {
    type: "textarea",
    label: "Long Overnight Call",
    description: "Details about the long overnight call structure.",
    placeholder: "e.g., Q4 call, night float, etc.",
  },
  scheduleContinuity: {
    type: "string",
    label: "Schedule & Continuity",
    description:
      "Overview of schedule structure and clinic integration (e.g., 4+1, X+Y).",
    placeholder: "e.g., 4+1, 6+2, traditional",
  },
  locations: {
    type: "textarea",
    label: "Locations",
    description: "Locations where rotations occur.",
    placeholder: "e.g., Main hospital, satellite clinics, etc.",
  },
  emr: {
    type: "select",
    label: "EMR System",
  },
  startDateOrientation: {
    type: "date",
    label: "Start Date Orientation",
    description:
      "The start date of the orientation period. Please use US Eastern Time.",
  },
  visaInfo: {
    type: "select",
    label: "Visa Information",
  },
  union: {
    type: "boolean",
    label: "Union",
    description: "Is the residency program part of a union?",
    defaultValue: false,
  },
  midlevel: {
    type: "textarea",
    label: "Midlevel",
    description: "Details about midlevel support (e.g., PAs, NPs).",
    placeholder:
      "e.g., Available during day shifts, no midlevel support on weekends.",
  },
  ancillary: {
    type: "textarea",
    label: "Ancillary Staff",
    description:
      "Details about ancillary staff (e.g., respiratory therapists, phlebotomists).",
    placeholder: "e.g., Full ancillary staff support on all shifts.",
  },
  teamRatios: {
    type: "string",
    label: "Team Ratios",
    description:
      "Typical team structure including the number of seniors, interns, and other team members.",
    placeholder: "e.g., 1 senior: 2 interns, 1 attending: 1 resident",
  },
  internCap: {
    type: "textarea",
    label: "Intern Cap",
    description: "Maximum number of patients an intern can carry.",
    placeholder: "e.g., 10 patients",
  },
  admittingSystem: {
    type: "textarea",
    label: "Admitting System",
    description: "System used for admitting patients.",
    placeholder: "e.g., Drip system, rotational admitting, etc.",
  },
  icuHours: {
    type: "textarea",
    label: "ICU Hours",
    description: "Details about ICU working hours.",
    placeholder: "e.g., 24-hour shifts, 12-hour shifts, etc.",
  },
  nightFloat: {
    type: "textarea",
    label: "Night Float",
    description: "Night float system details.",
    placeholder: "e.g., Night float covers admissions from 7 pm to 7 am.",
  },
  sickCallSystem: {
    type: "textarea",
    label: "Sick Call System",
    description: "Details about the sick call system.",
    placeholder: "e.g., Centralized sick call system, peer coverage, etc.",
  },
  moonlighting: {
    type: "string",
    label: "Moonlighting",
    description: "Details about moonlighting opportunities.",
    placeholder:
      "e.g., 2-3 each year, 1 per year in PGY2 and PGY3, 4-6 weeks electives",
  },
  stayUntilSignout: {
    type: "textarea",
    label: "Stay Until Sign-out",
    description: "Requirement to stay until sign-out is completed.",
    placeholder: "e.g., Required to stay until 7 pm for sign-out.",
  },
  didactics: {
    type: "textarea",
    label: "Didactics",
    description: "Structure of the didactics sessions.",
    placeholder: "e.g., Weekly protected didactics time, morning reports.",
  },
  vacationHolidays: {
    type: "textarea",
    label: "Vacation & Holidays",
    description: "Details about vacation and holiday time.",
    placeholder: "e.g., 4 weeks of vacation per year, rotating holidays.",
  },
  gym: {
    type: "textarea",
    label: "Gym",
    description: "Availability of gym facilities.",
    placeholder: "e.g., Onsite gym available 24/7.",
  },
  food: {
    type: "textarea",
    label: "Food",
    description: "Details about food availability.",
    placeholder: "e.g., Meal stipend, cafeteria hours.",
  },
  salary: {
    type: "textarea",
    label: "Salary",
    description: "Details about the salary structure.",
    placeholder: "e.g., $60,000 per year, with annual increases.",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
  },
};

export default scheduleDetailsFormSchema;
