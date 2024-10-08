export const fieldLabelMap: Record<string, Record<string, string>> = {
  signalTier: {
    GOLD: "Gold",
    SILVER: "Silver",
    NO_SIGNAL: "No Signal",
    SIGNAL: "Signalled (Unspecified)",
  },
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
    THIRD_FRIDAY: "3rd Friday",
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
  setting: {
    IN_PERSON: "In-person",
    VIRTUAL: "Virtual",
    BOTH: "Both",
  },
  sentTo: {
    PROGRAM_EMAIL: "Program Email",
    PC: "PC",
    PD: "PD",
    PD_PC: "PD and PC",
    EMAIL_ON_ERAS: "Email on ERAS",
    RESIDENCY_EXPLORER_EMAIL: "Residency Explorer Email",
  },
  responseTone: {
    POSITIVE: "Positive",
    GENERIC: "Generic",
    NEUTRAL: "Neutral",
    NEGATIVE: "Negative",
    AUTOMATED: "Automated",
  },
  howInterviewDayAffectsRank: {
    MUCH_LOWER: "Much Lower",
    LOWER: "Lower",
    SLIGHTLY_LOWER: "Slightly Lower",
    NO_CHANGE: "No Change",
    SLIGHTLY_HIGHER: "Slightly Higher",
    HIGHER: "Higher",
    MUCH_HIGHER: "Much Higher",
  },
  thankYouLetterPolicy: {
    DO_NOT_SEND: "Do Not Send",
    STRONGLY_DISCOURAGED: "Strongly Discouraged",
    DISCOURAGED: "Discouraged",
    NOT_EXPECTED: "Not Expected",
    NOT_REQUIRED: "Not Required",
    WELCOMED_BUT_NOT_EXPECTED: "Welcomed but Not Expected",
    WELCOMED: "Welcomed",
    POSITIVE_RESPONSE: "Positive Response",
  },
  source: {
    PD: "PD",
    PC: "PC",
    SELECTION_COMMITTEE: "Selection Committee",
    RESIDENT: "Resident",
    WEBSITE: "Website",
    STATEMENT_OF_MATCH_INTEGRITY: "Statement of Match Integrity",
    INTERVIEWER: "Interviewer",
  },
  malignant: {
    Yes: "Yes",
    No: "No",
    Maybe: "Maybe",
  },
  emr: {
    EPIC: "Epic",
    CERNER: "Cerner",
    MEDITECH: "Meditech",
    CPRS: "CPRS",
    ALLSCRIPTS: "Allscripts",
    ORCHID: "Orchid",
    SOARIAN: "Soarian",
    SUNRISE: "Sunrise",
    PARAGON: "Paragon",
    POWER_CHART: "Power Chart",
    OMR: "OMR",
    ICENTRA: "iCentra",
    CITRIX: "Citrix",
    OPTIMUM: "Optimum",
    MEDHOST: "Medhost",
    EPIC_CPRS: "Epic/CPRS",
  },
  visaInfo: {
    J1: "J1 Visa",
    H1B: "H1B Visa",
    J1_H1B: "J1/H1B Visa",
    NO_VISAS: "No Visa Sponsorship",
    ACCEPTS_VISA: "Accepts Visa",
  },
  graduateType: {
    US: "US",
    IMG: "IMG",
  },
  img: {
    NONUSIMG: "Non-US IMG",
    USIMG: "US IMG",
  },
  medicalDegree: {
    MD: "MD",
    DO: "DO",
  },
  schoolRanking: {
    TOP20: "Top 20",
    TOP50: "Top 50",
    MID: "Mid",
    LOW: "Low",
    UNRANKED: "Unranked",
  },
  classRank: {
    QUARTILE1: "Top 25%",
    QUARTILE2: "Second 25%",
    QUARTILE3: "Third 25%",
    QUARTILE4: "Bottom 25%",
  },
  step2CSPathway: {
    PATHWAY1: "Pathway 1",
    PATHWAY2: "Pathway 2",
    PATHWAY3: "Pathway 3",
    PATHWAY4: "Pathway 4",
    PATHWAY5: "Pathway 5",
    PATHWAY6: "Pathway 6",
  },
  // Add more mappings as needed for other fields...
};
