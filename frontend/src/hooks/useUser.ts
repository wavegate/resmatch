import { useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/authService";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

const useUser = () => {
  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["currentUser"], // Add token to the queryKey
    queryFn: authService.getCurrentUser,
    enabled: !!token, // Only fetch if token exists
    staleTime: 30 * 60 * 1000, // Consider data fresh for 30 minutes
    gcTime: 60 * 60 * 1000, // Cache for 1 hour
    retry: false,
  });

  const signOut = () => {
    localStorage.removeItem("token");
    queryClient.resetQueries({ queryKey: ["currentUser"] });
    queryClient.removeQueries({ queryKey: ["currentUser"] });
    notifications.show({
      message: "Sign out successful",
      withBorder: true,
      color: "green",
    });
  };

  return {
    user: data,
    isLoading,
    error,
    refetch,
    signOut,
  };
};

export default useUser;
