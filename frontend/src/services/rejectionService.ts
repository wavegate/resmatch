import apiClient from "@/apiClient";

const route = "/rejection";

interface Rejection {
  id: string | number;
  // Add other rejection-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the rejection
  programId: string | number;
  userId: string | number;
  date: string; // Date string
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  rejections: Rejection[];
}

const createRejection = async (formData: FormData): Promise<Rejection> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readRejection = async (id: string | number): Promise<Rejection> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateRejection = async (
  id: string | number,
  formData: FormData
): Promise<Rejection> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteRejection = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchRejection = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createRejection,
  readRejection,
  updateRejection,
  deleteRejection,
  searchRejection,
};
