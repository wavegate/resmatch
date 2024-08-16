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
  // Determine if the route is "lOIntentResponse" or "lOIResponse"
  const isLOIntentResponse = route === "/lOIntentResponse";
  const isLOIResponse = route === "/lOIResponse";

  // Set the final route based on the route check
  const finalRoute =
    isLOIntentResponse || isLOIResponse ? "lOIResponse" : route;

  // Determine the intent value based on the route
  const intentValue = isLOIntentResponse
    ? true
    : isLOIResponse
    ? false
    : undefined;

  return {
    create: async (formData: FormData): Promise<T> => {
      const { data } = await apiClient.post(finalRoute, {
        ...(intentValue !== undefined && { intent: intentValue }),
        ...formData,
      });
      return data;
    },

    read: async (id: string | number): Promise<T> => {
      const { data } = await apiClient.get(`${finalRoute}/${id}`);
      return data;
    },

    update: async (id: string | number, formData: FormData): Promise<T> => {
      const { data } = await apiClient.put(`${finalRoute}/${id}`, {
        ...(intentValue !== undefined && { intent: intentValue }),
        ...formData,
      });
      return data;
    },

    delete: async (id: string | number): Promise<void> => {
      await apiClient.delete(`${finalRoute}/${id}`);
    },

    search: async ({
      pageNum,
      ...params
    }: SearchParams): Promise<SearchResponse<T>> => {
      const { data } = await apiClient.post(`${finalRoute}/search`, {
        pageNum,
        ...(intentValue !== undefined && { intent: intentValue }),
        ...params,
      });
      return data;
    },
  };
};

export default createService;
