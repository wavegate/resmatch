import apiClient from "@/apiClient";

const route = "/tier-list";

interface TierList {
  id: string | number;
  title: string;
  img?: boolean;
  bins: Bin[];
  // Add other TierList-related properties here
}

interface Bin {
  id: string | number;
  name: string;
  programs: Program[];
  // Add other Bin-related properties here
}

interface Program {
  id: string | number;
  name: string;
  institution: Institution;
  // Add other Program-related properties here
}

interface Institution {
  name: string;
  // Add other Institution-related properties here
}

const readTierList = async (id: string | number): Promise<TierList> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateTierList = async (
  id: string | number,
  formData: Partial<TierList>
): Promise<TierList> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteTierList = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

export default {
  readTierList,
  updateTierList,
  deleteTierList,
};
