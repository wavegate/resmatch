import apiClient from "@/apiClient";

const route = "/comment";

interface Comment {
  id: number;
  content: string;
  pstp: boolean;
  report: boolean;
  parentId: number | null;
  children: Comment[];
  // Add other comment-related properties here
}

interface SearchCommentParams {
  pstp?: boolean;
  report?: boolean;
  threadId?: number; // Assuming you want to filter by thread
  pageNum?: number;
}

interface SearchResponse {
  totalCount: number;
  comments: Comment[];
}

const searchComment = async ({
  pstp = false,
  report = false,
  threadId,
  pageNum = 1,
}: SearchCommentParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pstp,
    report,
    threadId,
    pageNum,
  });
  return data;
};

const createComment = async (formData: Partial<Comment>): Promise<Comment> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readComment = async (id: number): Promise<Comment> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateComment = async (
  id: number,
  formData: Partial<Comment>
): Promise<Comment> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteComment = async (id: number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

export default {
  searchComment,
  createComment,
  readComment,
  updateComment,
  deleteComment,
};
