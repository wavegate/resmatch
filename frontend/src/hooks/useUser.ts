import { useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/authService";

const useUser = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: authService.getCurrentUser,
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
