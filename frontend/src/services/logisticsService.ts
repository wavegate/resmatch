import apiClient from "@/apiClient";

const route = "/logistics";

interface Logistics {
  id: string | number;
  // Add other logistics-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the logistics
  sortType: string;
  schedulerPlatform?: string;
  ivFormat?: string;
  timeSlots?: string;
  ivPlatform?: string;
  openIVDates?: string[]; // Array of date strings
  interviewInviteId: string | number;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  logistics: Logistics[];
}

const createLogistics = async (formData: FormData): Promise<Logistics> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readLogistics = async (id: string | number): Promise<Logistics> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateLogistics = async (
  id: string | number,
  formData: FormData
): Promise<Logistics> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteLogistics = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchLogistics = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createLogistics,
  readLogistics,
  updateLogistics,
  deleteLogistics,
  searchLogistics,
};
