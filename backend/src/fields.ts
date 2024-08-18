/**
 * Intersects two arrays of fields and returns the common fields.
 *
 * @param {string[]} list1 - The first list of fields.
 * @param {string[]} list2 - The second list of fields.
 * @returns {string[]} The array of fields that are common to both lists.
 */
export function intersectFields(list1: string[], list2: string[]): string[] {
  return list1.filter((field) => list2.includes(field));
}

export const userFields = [
  "email",
  "alias",
  "greenCard",
  "step2CSPathway",
  "schoolRanking",
  "yearOfGraduation",
  "monthsOfUSCE",
  "ecfmgCertified",
  "visaRequired",
  "graduateType",
  "medicalDegree",
  "img",
  "step1ScorePass",
  "step1Score",
  "step2Score",
  "step3Score",
  "comlex1ScorePass",
  "comlex2Score",
  "redFlags",
  "redFlagsExplanation",
  "aoa",
  "sigmaSigmaPhi",
  "goldHumanism",
  "honors",
  "highPass",
  "pass",
  "fail",
  "pstp",
  "numPublications",
  "numWorkExperiences",
  "numVolunteerExperiences",
  "classRank",
  "otherDegrees",
  "numApplications",
  "numInterviews",
  "numWithdrawn",
  "numRejected",
  "numWaitlisted",
  "applicationYear",
  "public",
];

export const interviewInviteFields = [
  "graduateType",
  "img",
  "date",
  "geographicPreference",
  "signal",
  "inState",
  "medicalDegree",
  "step1ScorePass",
  "step1Score",
  "step2Score",
  "comlex1ScorePass",
  "comlex2Score",
  "visaRequired",
  "subI",
  "home",
  "pstp",
  "honors",
  "highPass",
  "pass",
  "fail",
  "yearOfGraduation",
  "greenCard",
  "away",
  "anonymous",
  "userId",
  "programId",
];
