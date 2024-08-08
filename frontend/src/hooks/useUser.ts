import { useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/authService";

const useUser = () => {
  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");

  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: authService.getCurrentUser,
    enabled: !!token, // Only run the query if the token exists
    retry: false,
  });

  const signOut = () => {
    localStorage.removeItem("token");
    queryClient.resetQueries({ queryKey: ["user"] });
  };

  return {
    user: data,
    isLoading,
    error,
    signOut,
  };
};

export default useUser;
