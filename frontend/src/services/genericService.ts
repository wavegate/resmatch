import apiClient from "@/apiClient";

interface SearchParams {
  pageNum: number;
  [key: string]: any; // Allows for additional search parameters like programId, userId, etc.
}

interface SearchResponse<T> {
  totalCount: number;
  items: T[];
}

const createService = <T, FormData>(route: string) => {
  return {
    create: async (formData: FormData): Promise<T> => {
      const { data } = await apiClient.post(route, formData);
      return data;
    },

    read: async (id: string | number): Promise<T> => {
      const { data } = await apiClient.get(`${route}/${id}`);
      return data;
    },

    update: async (id: string | number, formData: FormData): Promise<T> => {
      const { data } = await apiClient.put(`${route}/${id}`, formData);
      return data;
    },

    delete: async (id: string | number): Promise<void> => {
      await apiClient.delete(`${route}/${id}`);
    },

    search: async ({
      pageNum,
      ...params
    }: SearchParams): Promise<SearchResponse<T>> => {
      const { data } = await apiClient.post(`${route}/search`, {
        pageNum,
        ...params,
      });
      return data;
    },
  };
};

export default createService;
