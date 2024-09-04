import { FormSchema } from "./schema";

const cityUserInputFormSchema: FormSchema = {
  cityId: {
    type: "citySearch", // Assuming you have a city search component
    label: "City",
    description: "The city you are providing input for.",
    required: true,
  },
  pros: {
    type: "string",
    label: "Pros",
    description: "Positive aspects of the city.",
    placeholder: "e.g., Great public parks, vibrant nightlife",
  },
  cons: {
    type: "string",
    label: "Cons",
    description: "Negative aspects of the city.",
    placeholder: "e.g., High cost of living, traffic congestion",
  },
  publicTransportation: {
    type: "string",
    label: "Public Transportation",
    description: "Your thoughts on the city's public transportation system.",
    placeholder: "e.g., Well-connected, unreliable, expensive",
  },
  weather: {
    type: "string",
    label: "Weather",
    description: "Your experience with the city's weather.",
    placeholder: "e.g., Mild, extreme, unpredictable",
  },
  dating: {
    type: "string",
    label: "Dating Scene",
    description: "Your thoughts on the dating scene in the city.",
    placeholder: "e.g., Thriving, challenging, diverse",
  },
  lgbtq: {
    type: "string",
    label: "LGBTQ+ Friendliness",
    description: "Your assessment of the city's LGBTQ+ friendliness.",
    placeholder: "e.g., Welcoming, indifferent, hostile",
  },
  diversity: {
    type: "string",
    label: "Diversity",
    description: "Your perspective on the city's diversity.",
    placeholder: "e.g., Culturally rich, homogeneous, varied",
  },
  safetyCrime: {
    type: "string",
    label: "Safety and Crime",
    description:
      "Your observations on the safety and crime levels in the city.",
    placeholder: "e.g., Safe, crime-ridden, improving",
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "An anonymous post is not linked to your user profile.",
  },
  comments: {
    type: "comments", // Based on your preference for a comment type
  },
};

export default cityUserInputFormSchema;
