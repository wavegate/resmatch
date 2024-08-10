import apiClient from "@/apiClient";

const route = "/impression";

interface Impression {
  id: string | number;
  // Add other impression-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the impression
  positives?: string;
  negatives?: string;
  howInterviewDayAffectsRank?: string;
  gift?: string;
  timeGiftReceived?: string;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  impressions: Impression[];
}

const createImpression = async (formData: FormData): Promise<Impression> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readImpression = async (id: string | number): Promise<Impression> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateImpression = async (
  id: string | number,
  formData: FormData
): Promise<Impression> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteImpression = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchImpression = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createImpression,
  readImpression,
  updateImpression,
  deleteImpression,
  searchImpression,
};
