import apiClient from "@/apiClient";

const route = "/fellowship-match";

interface FellowshipMatch {
  id: string | number;
  year: string;
  programId: string | number;
  userId: string | number;
  details: string;
}

interface FormData {
  year: string;
  programId: string | number;
  details: string;
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  fellowshipMatches: FellowshipMatch[];
}

const createFellowshipMatch = async (
  formData: FormData
): Promise<FellowshipMatch> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readFellowshipMatch = async (
  id: string | number
): Promise<FellowshipMatch> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateFellowshipMatch = async (
  id: string | number,
  formData: FormData
): Promise<FellowshipMatch> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteFellowshipMatch = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchFellowshipMatch = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createFellowshipMatch,
  readFellowshipMatch,
  updateFellowshipMatch,
  deleteFellowshipMatch,
  searchFellowshipMatch,
};
