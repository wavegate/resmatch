// utils/gravatar.ts
import dayjs from "dayjs";
import md5 from "js-md5";

/**
 * Generates a Gravatar URL for the given email.
 *
 * @param {string} email - The user's email address.
 * @param {number} [size=200] - The size of the Gravatar image.
 * @param {string} [defaultImage='identicon'] - The default image to use if no Gravatar is found.
 * @param {string} [rating='pg'] - The rating of the Gravatar image.
 * @returns {string} The Gravatar URL.
 */
export function generateGravatarUrl(
  email: string,
  size: number = 200,
  defaultImage: string = "identicon",
  rating: string = "pg"
): string {
  // Normalize the email address by trimming whitespace and converting to lowercase
  const normalizedEmail = email.trim().toLowerCase();

  // Create an MD5 hash of the email
  const hash = md5(normalizedEmail);

  // Construct the Gravatar URL
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImage}&r=${rating}`;

  return gravatarUrl;
}

export function convertToYesNo(value) {
  return value === true ? "Yes" : value === false ? "No" : "";
}

export function convertToBinnedValue(value) {
  // Attempt to parse the value as a number
  const numericValue = parseFloat(value);

  // Check if the parsed value is a valid number
  if (!isNaN(numericValue)) {
    const lowerBound = Math.floor(numericValue / 5) * 5;
    const upperBound = lowerBound + 4;
    return `${lowerBound}-${upperBound}`;
  }

  // Return the original string if it's not a number
  return value;
}

export function displayUTC(date) {
  return dayjs(date).utc().format("MM/DD/YYYY");
}
