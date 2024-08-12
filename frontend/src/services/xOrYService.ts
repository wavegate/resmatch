import apiClient from "@/apiClient";

const route = "/x-or-y";

interface XorY {
  id: number;
  programXId: number;
  programYId: number;
  question: string;
  comments: Comment[];
  // Add other XorY-related properties here
}

interface FormData {
  programXId: number;
  programYId: number;
  question: string;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum?: number;
  img: boolean;
}

interface SearchResponse {
  totalCount: number;
  xOrYs: XorY[];
}

const createXorY = async (formData: FormData): Promise<XorY> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readXorY = async (id: number): Promise<XorY> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateXorY = async (id: number, formData: FormData): Promise<XorY> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteXorY = async (id: number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchXorY = async ({
  pageNum = 1,
  img = false,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
    img,
  });
  return data;
};

export default {
  createXorY,
  readXorY,
  updateXorY,
  deleteXorY,
  searchXorY,
};
