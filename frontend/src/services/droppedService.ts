import apiClient from "@/apiClient";

const route = "/dropped";

interface Dropped {
  id: string | number;
  // Add other dropped-related properties here
  dateDropped: string;
  dateOfInterviewCancelled?: string;
  reason?: string;
}

interface FormData {
  dateDropped: string;
  dateOfInterviewCancelled?: string;
  reason?: string;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  dropped: Dropped[];
}

const createDropped = async (formData: FormData): Promise<Dropped> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readDropped = async (id: string | number): Promise<Dropped> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateDropped = async (
  id: string | number,
  formData: FormData
): Promise<Dropped> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteDropped = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchDropped = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createDropped,
  readDropped,
  updateDropped,
  deleteDropped,
  searchDropped,
};
