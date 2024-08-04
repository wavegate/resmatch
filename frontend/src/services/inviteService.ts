import apiClient from "@/apiClient";

const route = "/invite";

interface Invite {
  id: string | number;
  programId: string | number;
  userId: string | number;
  inviteDateTime: string;
  // Add other invite-related properties here
}

interface FormData {
  anonymous: boolean;
  programId: string | number;
  inviteDateTime: string;
  signal?: Boolean;
  geographicPreference?: string;
  locationState?: string;
  step1ScorePass?: boolean;
  step1Score?: number;
  step2Score?: number;
  comlex1ScorePass?: boolean;
  comlex2Score?: number;
  visaRequired?: boolean;
  subI?: boolean;
  home?: boolean;
  yearOfGraduation?: number;
  greenCard?: boolean;
  away?: boolean;
  graduateType?: string;
  img?: string;
  medicalDegree?: string;
  // Add other fields as necessary
}

interface SearchParams {
  programId?: string | number;
  userId?: string | number;
  startDate?: string;
  endDate?: string;
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  invites: Invite[];
}
const createInvite = async (formData: FormData): Promise<Invite> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readInvite = async (id: string | number): Promise<Invite> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateInvite = async (
  id: string | number,
  formData: FormData
): Promise<Invite> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteInvite = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchInvite = async ({
  programId,
  userId,
  startDate,
  endDate,
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    programId,
    userId,
    startDate,
    endDate,
    pageNum,
  });
  return data;
};

export default {
  createInvite,
  readInvite,
  updateInvite,
  deleteInvite,
  searchInvite,
};
