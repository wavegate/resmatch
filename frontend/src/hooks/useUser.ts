import { useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/authService";
import { notifications } from "@mantine/notifications";

const useUser = () => {
  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");

  const { data, error, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: authService.getCurrentUser,
    retry: false,
  });

  const signOut = () => {
    localStorage.removeItem("token");
    queryClient.resetQueries({ queryKey: ["currentUser"] });
    notifications.show({
      message: "Sign out successful",
      withBorder: true,
    });
  };

  return {
    user: data,
    isLoading,
    error,
    signOut,
  };
};

export default useUser;
