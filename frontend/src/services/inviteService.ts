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

const getTotalInvitesOverTime = async (): Promise<
  TotalInvitesOverTimeResponse[]
> => {
  const { data } = await apiClient.get(`${route}/total-invites-over-time`);
  return data;
};
const getSignalsOverTime = async (): Promise<any> => {
  const { data } = await apiClient.get(`${route}/signals-over-time`);
  return data;
};
const getProgramCompetitiveness = async (): Promise<any> => {
  const { data } = await apiClient.get(`${route}/program-competitiveness`);
  return data;
};

const getProgramsWithMostInvites = async (): Promise<any> => {
  const { data } = await apiClient.get(`${route}/programs-with-most-invites`);
  return data;
};

const getInvitesByGraduateType = async (): Promise<any> => {
  const { data } = await apiClient.get(`${route}/invites-by-graduate-type`);
  return data;
};

const getInvitesByState = async (): Promise<any> => {
  const { data } = await apiClient.get(`${route}/invites-by-state`);
  return data;
};

const getProgramsMinInviteSpots = async (): Promise<any> => {
  const { data } = await apiClient.get(`${route}/programs-min-invite-spots`);
  return data;
};
const getLast10Programs = async (): Promise<any> => {
  const { data } = await apiClient.get(`${route}/last-10-programs`);
  return data;
};
const getInvitesByGeographicPreference = async (): Promise<any> => {
  const { data } = await apiClient.get(
    `${route}/invites-by-geographic-preference`
  );
  return data;
};

const getTop10UsersByInvites = async (): Promise<any> => {
  const { data } = await apiClient.get(`${route}/top-10-users-invites`);
  return data;
};

const getInviteQuantiles = async (): Promise<any> => {
  const { data } = await apiClient.get(`${route}/invite-quantiles`);
  return data;
};

export default {
  createInvite,
  readInvite,
  updateInvite,
  deleteInvite,
  searchInvite,
  getTotalInvitesOverTime,
  getSignalsOverTime,
  getProgramCompetitiveness,
  getProgramsWithMostInvites,
  getInvitesByGraduateType,
  getInvitesByState,
  getProgramsMinInviteSpots,
  getLast10Programs,
  getInvitesByGeographicPreference,
  getTop10UsersByInvites,
  getInviteQuantiles,
};
