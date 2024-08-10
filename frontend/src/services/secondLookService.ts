import apiClient from "@/apiClient";

const route = "/second-look";

interface SecondLook {
  id: string | number;
  // Add other second look-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the second look
  setting?: string;
  date?: string; // Date string
  bearingOnRank?: string;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  secondLooks: SecondLook[];
}

const createSecondLook = async (formData: FormData): Promise<SecondLook> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readSecondLook = async (id: string | number): Promise<SecondLook> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateSecondLook = async (
  id: string | number,
  formData: FormData
): Promise<SecondLook> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteSecondLook = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchSecondLook = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createSecondLook,
  readSecondLook,
  updateSecondLook,
  deleteSecondLook,
  searchSecondLook,
};
