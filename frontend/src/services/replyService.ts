import apiClient from "@/apiClient";

const route = "/reply";

interface Reply {
  id: string | number;
  content: string;
  createdAt: string;
  threadId: string | number;
  userId: string | number;
  // Add other reply-related properties here if necessary
}

interface FormData {
  content: string;
  // Add additional fields as necessary
}

interface SearchParams {
  threadId: string | number;
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  replies: Reply[];
}

const createReply = async (
  threadId: string | number,
  formData: FormData
): Promise<Reply> => {
  const { data } = await apiClient.post(`${route}/${threadId}`, formData);
  return data;
};

const readReply = async (id: string | number): Promise<Reply> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateReply = async (
  id: string | number,
  formData: FormData
): Promise<Reply> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteReply = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchReplies = async ({
  threadId,
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/${threadId}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createReply,
  readReply,
  updateReply,
  deleteReply,
  searchReplies,
};
