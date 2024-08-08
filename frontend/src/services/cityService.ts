import apiClient from "@/apiClient";

const route = "/city";

interface City {
  id: string | number;
  name: string;
  state: string;
  // Add other city-related properties here if necessary
}

interface FormData {
  name: string;
  state: string;
  // Add additional fields as necessary
}

interface SearchParams {
  searchTerm: string | null;
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  cities: City[];
}

const createCity = async (formData: FormData): Promise<City> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readCity = async (id: string | number): Promise<City> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateCity = async (
  id: string | number,
  formData: FormData
): Promise<City> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteCity = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchCity = async ({
  searchTerm,
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    searchTerm,
    pageNum,
  });
  return data;
};

export default {
  createCity,
  readCity,
  updateCity,
  deleteCity,
  searchCity,
};
