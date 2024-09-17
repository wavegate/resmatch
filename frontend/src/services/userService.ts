import apiClient from "@/apiClient";

const route = "/user";

interface User {
  id: string | number;
  alias: string;
  // Add other user-related properties here
}

interface UserFormData {
  alias?: string;
  programIdToAdd?: number;
  programIdToRemove?: number;
}

interface UserSearchParams {
  searchTerm: string | null;
  pageNum: number;
  graduateType: string;
}

interface UserSearchResponse {
  totalCount: number;
  users: User[];
}

const createUser = async (formData: UserFormData): Promise<void> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readUser = async (id: string | number): Promise<User> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateUser = async (
  id: string | number,
  formData: UserFormData
): Promise<User> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteUser = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchUser = async ({
  searchTerm,
  pageNum,
  graduateType,
}: UserSearchParams): Promise<UserSearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    searchTerm,
    pageNum,
    graduateType,
  });
  return data;
};

export default {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  searchUser,
};
