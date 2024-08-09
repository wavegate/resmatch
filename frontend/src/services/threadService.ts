import apiClient from "@/apiClient";

const route = "/thread";

interface Thread {
  id: string | number;
  title: string;
  content: string;
  createdAt: string;
  userId: string | number;
  // Add other thread-related properties here if necessary
}

interface FormData {
  title: string;
  content: string;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  threads: Thread[];
}

const createThread = async (formData: FormData): Promise<Thread> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readThread = async (id: string | number): Promise<Thread> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateThread = async (
  id: string | number,
  formData: FormData
): Promise<Thread> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteThread = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchThread = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createThread,
  readThread,
  updateThread,
  deleteThread,
  searchThread,
};
