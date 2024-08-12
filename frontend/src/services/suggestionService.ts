import apiClient from "@/apiClient";

const route = "/suggestion";

interface Suggestion {
  id: string | number;
  content: string;
  userId: string | number;
  tierListId: string | number;
  linked: boolean;
  createdAt: string;
  updatedAt: string;
  // Add other suggestion-related properties here if necessary
}

interface FormData {
  content: string;
  userId: string | number;
  tierListId: string | number;
  linked?: boolean; // Optional, defaults to false
}

interface SearchParams {
  tierListId?: string | number; // Optional filter by tierListId
}

interface SearchResponse {
  totalCount: number;
  suggestions: Suggestion[];
}

const createSuggestion = async (formData: FormData): Promise<Suggestion> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readSuggestion = async (id: string | number): Promise<Suggestion> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateSuggestion = async (
  id: string | number,
  formData: FormData
): Promise<Suggestion> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteSuggestion = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchSuggestion = async ({
  pageNum,
  tierListId,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
    tierListId, // Optional filter by tierListId
  });
  return data;
};

export default {
  createSuggestion,
  readSuggestion,
  updateSuggestion,
  deleteSuggestion,
  searchSuggestion,
};
