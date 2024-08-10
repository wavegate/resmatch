import apiClient from "@/apiClient";

const route = "/m4-intern-impression";

interface M4InternImpression {
  id: string | number;
  // Add other M4 intern impression-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the M4 intern impression
  positiveImpression?: string;
  negativeImpression?: string;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  m4InternImpressions: M4InternImpression[];
}

const createM4InternImpression = async (
  formData: FormData
): Promise<M4InternImpression> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readM4InternImpression = async (
  id: string | number
): Promise<M4InternImpression> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateM4InternImpression = async (
  id: string | number,
  formData: FormData
): Promise<M4InternImpression> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteM4InternImpression = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchM4InternImpression = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createM4InternImpression,
  readM4InternImpression,
  updateM4InternImpression,
  deleteM4InternImpression,
  searchM4InternImpression,
};
