import apiClient from "@/apiClient";

const route = "/malignant";

interface Malignant {
  id: string | number;
  // Add other malignant-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the malignant entry
  malignant: string;
  source?: string;
  explanation?: string;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  malignants: Malignant[];
}

const createMalignant = async (formData: FormData): Promise<Malignant> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readMalignant = async (id: string | number): Promise<Malignant> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateMalignant = async (
  id: string | number,
  formData: FormData
): Promise<Malignant> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteMalignant = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchMalignant = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createMalignant,
  readMalignant,
  updateMalignant,
  deleteMalignant,
  searchMalignant,
};
