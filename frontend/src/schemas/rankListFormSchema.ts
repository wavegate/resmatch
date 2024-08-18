import { FormSchema } from "./schema";

const rankListFormSchema: FormSchema = {
  graduateType: {
    type: "select",
    label: "Graduate Type",
    description:
      "Are you a U.S. graduate or an International Medical Graduate (IMG)?",
    placeholder: "Select your graduate type",
    required: true,
  },
  medicalDegree: {
    type: "select",
    label: "Medical Degree",
    description: "Is your degree MD or DO?",
    conditions: { graduateType: "US" },
    placeholder: "Select your medical degree",
  },
  numberOfProgramsApplied: {
    type: "number",
    label: "# of Programs Applied",
    description: "Enter the number of programs you applied to.",
    placeholder: "Enter the number of programs",
  },
  numberOfInvites: {
    type: "number",
    label: "# of Invites",
    description: "Enter the number of interview invites you received.",
    placeholder: "Enter the number of invites",
  },
  numberOfInterviewsAttended: {
    type: "number",
    label: "# of Interviews Attended",
    description: "Enter the number of interviews you attended.",
    placeholder: "Enter the number of interviews",
  },
  doneWithInterviews: {
    type: "boolean",
    label: "Done with Interviews",
    description: "Have you completed all of your interviews?",
  },
  whyNumberOne: {
    type: "textarea",
    label: "Why Number One?",
    description: "Describe why this program is your top choice.",
    placeholder: "Enter your reason",
  },
  prioritiesWhenRanking: {
    type: "textarea",
    label: "Priorities When Ranking",
    description: "What are your priorities when ranking programs?",
    placeholder: "Enter your priorities",
  },
  hardestPartOfRanking: {
    type: "textarea",
    label: "Hardest Part of Ranking",
    description: "What was the hardest part of ranking the programs?",
    placeholder: "Enter the hardest part",
  },
  comments: {
    type: "comments",
    label: "Comments",
    description: "Add any additional comments you may have.",
    placeholder: "Enter your comments",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "Would you like to post this anonymously?",
    required: false,
  },
  matchedProgramId: {
    type: "programSearch",
    label: "Matched Program",
    description: "Select the program you matched to.",
    placeholder: "Search and select the program",
  },
};

export default rankListFormSchema;
