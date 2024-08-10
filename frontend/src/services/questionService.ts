import apiClient from "@/apiClient";

const route = "/question";

interface Question {
  id: string | number;
  // Add other question-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the question
  questions: string[]; // Array of strings
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  questions: Question[];
}

const createQuestion = async (formData: FormData): Promise<Question> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readQuestion = async (id: string | number): Promise<Question> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateQuestion = async (
  id: string | number,
  formData: FormData
): Promise<Question> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteQuestion = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchQuestion = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createQuestion,
  readQuestion,
  updateQuestion,
  deleteQuestion,
  searchQuestion,
};
