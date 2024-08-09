import apiClient from "@/apiClient";

const route = "/rank-list";

interface RankList {
  id: string | number;
  graduateType: string;
  numberOfProgramsApplied: number;
  numberOfInvites: number;
  numberOfInterviewsAttended: number;
  programs: Program[];
  matchedProgramId?: string | number;
  doneWithInterviews: boolean;
  whyNumberOne: string;
  prioritizesWhenRanking: string;
  hardestPartOfRanking: string;
  medicalDegree: string;
  // Add other rank list-related properties here
}

interface Program {
  id: string | number;
  // Add other program-related properties here
}

interface FormData {
  graduateType: string;
  numberOfProgramsApplied: number;
  numberOfInvites: number;
  numberOfInterviewsAttended: number;
  programs: string[]; // Array of program IDs
  matchedProgramId?: string | number;
  doneWithInterviews: boolean;
  whyNumberOne: string;
  prioritizesWhenRanking: string;
  hardestPartOfRanking: string;
  medicalDegree: string;
  // Add additional fields as necessary
}

interface SearchParams {
  searchTerm: string | null;
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  rankLists: RankList[];
}

const createRankList = async (formData: FormData): Promise<RankList> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readRankList = async (id: string | number): Promise<RankList> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateRankList = async (
  id: string | number,
  formData: FormData
): Promise<RankList> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteRankList = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchRankList = async ({
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
  createRankList,
  readRankList,
  updateRankList,
  deleteRankList,
  searchRankList,
};
