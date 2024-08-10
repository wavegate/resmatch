import apiClient from "@/apiClient";

const route = "/post-iv-communication";

interface PostIVCommunication {
  id: string | number;
  // Add other post-IV communication-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the post-IV communication
  communicationReceived?: string;
  thankYouLetterPolicy?: string;
  rankImpact?: string;
  source?: string;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  postIVCommunications: PostIVCommunication[];
}

const createPostIVCommunication = async (
  formData: FormData
): Promise<PostIVCommunication> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readPostIVCommunication = async (
  id: string | number
): Promise<PostIVCommunication> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updatePostIVCommunication = async (
  id: string | number,
  formData: FormData
): Promise<PostIVCommunication> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deletePostIVCommunication = async (
  id: string | number
): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchPostIVCommunication = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createPostIVCommunication,
  readPostIVCommunication,
  updatePostIVCommunication,
  deletePostIVCommunication,
  searchPostIVCommunication,
};
