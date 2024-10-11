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
      const { data } = await apiClient.post(route, {
        ...formData,
      });
      return data;
    },

    read: async (id: string | number): Promise<T> => {
      const { data } = await apiClient.get(`${route}/${id}`);
      return data;
    },

    update: async (id: string | number, formData: FormData): Promise<T> => {
      const { data } = await apiClient.put(`${route}/${id}`, {
        ...formData,
      });
      return data;
    },

    upvote: async (id: string | number, isUpvote: boolean): Promise<T> => {
      const { data } = await apiClient.put(`${route}/upvote/${id}`, {
        isUpvote,
      });
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

    getAll: async (): Promise<T[]> => {
      const { data } = await apiClient.get(`${route}/all`);
      return data;
    },

    getRowModel: async ({
      startRow,
      endRow,
      sortModel,
      filterModel,
      showFollowed,
    }): Promise<{ items: T[]; lastRow: number }> => {
      // Create a request payload object
      const requestBody = {
        startRow,
        endRow,
        showFollowed,
        sortModel,
        filterModel,
      };

      // Make the API request, sending the parameters in the request body
      const { data } = await apiClient.post(`${route}/rowModel`, requestBody);

      // Return the paginated items and lastRow count
      return data;
    },
  };
};

export default createService;
