import { faker } from "@faker-js/faker";

function generateCodename(): string {
  const noun1 = faker.word.noun();
  const noun2 = faker.word.noun();
  const number = faker.string.numeric(3);
  return `${capitalize(noun1)}${capitalize(noun2)}${number}`;
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export { generateCodename };
