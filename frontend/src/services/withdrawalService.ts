import apiClient from "@/apiClient";

const route = "/withdrawal";

interface Withdrawal {
  id: string | number;
  // Add other withdrawal-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the withdrawal
  programId: string | number;
  userId: string | number;
  date: string; // Date string
  reason?: string;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  withdrawals: Withdrawal[];
}

const createWithdrawal = async (formData: FormData): Promise<Withdrawal> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readWithdrawal = async (id: string | number): Promise<Withdrawal> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateWithdrawal = async (
  id: string | number,
  formData: FormData
): Promise<Withdrawal> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteWithdrawal = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchWithdrawal = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createWithdrawal,
  readWithdrawal,
  updateWithdrawal,
  deleteWithdrawal,
  searchWithdrawal,
};
