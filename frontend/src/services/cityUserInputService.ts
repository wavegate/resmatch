import apiClient from "@/apiClient";

const route = "/city-user-input";

interface CityUserInput {
  id: number;
  cityId: number;
  pros?: string;
  cons?: string;
  publicTransportation?: string;
  weather?: string;
  dating?: string;
  lgbtq?: string;
  diversity?: string;
  safetyCrime?: string;
  linked?: boolean;
  userId: number;
}

interface FormData {
  cityId: number;
  pros?: string;
  cons?: string;
  publicTransportation?: string;
  weather?: string;
  dating?: string;
  lgbtq?: string;
  diversity?: string;
  safetyCrime?: string;
  linked?: boolean;
}

interface SearchParams {
  cityId?: number;
  userId?: number;
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  cityUserInputs: CityUserInput[];
}

const createCityUserInput = async (
  formData: FormData
): Promise<CityUserInput> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readCityUserInput = async (id: number): Promise<CityUserInput> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateCityUserInput = async (
  id: number,
  formData: FormData
): Promise<CityUserInput> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteCityUserInput = async (id: number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchCityUserInput = async ({
  cityId,
  userId,
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    cityId,
    userId,
    pageNum,
  });
  return data;
};

export default {
  createCityUserInput,
  readCityUserInput,
  updateCityUserInput,
  deleteCityUserInput,
  searchCityUserInput,
};
