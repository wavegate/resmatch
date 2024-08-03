import apiClient from "@/apiClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchUserInfo = async () => {
  const response = await apiClient.get("/user-info");
  return response.data;
};

export default () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserInfo,
    retry: false,
  });

  const signOut = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Invalidate and remove the user query from cache
    queryClient.resetQueries({ queryKey: ["user"] });
  };

  console.log(data);

  return {
    user: data,
    isLoading,
    error,
    signOut,
  };
};
