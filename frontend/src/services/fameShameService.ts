import apiClient from "@/apiClient";

const route = "/fame-shame";

interface FameShameInput {
  id: string | number;
  fame: string;
  shame: string;
  programId: string | number;
  userId: string | number;
}

interface FormData {
  fame: string;
  shame: string;
  programId: string | number;
}

interface SearchParams {
  searchTerm?: string | null;
  programId?: string | number | null;
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  fameShameInputs: FameShameInput[];
}

// Create a new FameShameUserInput
const createFameShame = async (formData: FormData): Promise<FameShameInput> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

// Read a specific FameShameUserInput by ID
const readFameShame = async (id: string | number): Promise<FameShameInput> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

// Update a specific FameShameUserInput by ID
const updateFameShame = async (
  id: string | number,
  formData: FormData
): Promise<FameShameInput> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

// Delete a specific FameShameUserInput by ID
const deleteFameShame = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

// Search for FameShameUserInputs with optional filtering by programId and pagination
const searchFameShame = async ({
  searchTerm = "",
  programId = null,
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    searchTerm,
    programId,
    pageNum,
  });
  return data;
};

export default {
  createFameShame,
  readFameShame,
  updateFameShame,
  deleteFameShame,
  searchFameShame,
};
