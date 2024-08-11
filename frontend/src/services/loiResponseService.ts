import apiClient from "@/apiClient";

const route = "/loi-response";

interface LOIResponse {
  id: string | number;
  // Add other LOI response-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the LOI response
  intent?: boolean;
  sentTo?: string;
  dateSent?: string; // Date string
  response?: boolean;
  responseTone?: string;
  timeBetweenSentAndResponse?: string;
  mentionedTopChoice?: boolean;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
  intent?: boolean;
}

interface SearchResponse {
  totalCount: number;
  loiResponses: LOIResponse[];
}

const createLOIResponse = async (formData: FormData): Promise<LOIResponse> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readLOIResponse = async (id: string | number): Promise<LOIResponse> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateLOIResponse = async (
  id: string | number,
  formData: FormData
): Promise<LOIResponse> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteLOIResponse = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchLOIResponse = async ({
  pageNum,
  intent,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
    intent,
  });
  return data;
};

export default {
  createLOIResponse,
  readLOIResponse,
  updateLOIResponse,
  deleteLOIResponse,
  searchLOIResponse,
};
