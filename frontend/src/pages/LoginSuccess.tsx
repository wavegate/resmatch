import useUser from "@/hooks/useUser";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const { refetch } = useUser();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    // Get the token from the URL (e.g., login-success?token=your_jwt_token)
    const token = searchParams.get("token");

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Display a success notification
      notifications.show({
        message: "Login successful",
        withBorder: true,
        color: "green",
      });

      // Reset any queries related to the current user
      // queryClient.resetQueries({ queryKey: ["currentUser"] });
      refetch();

      // Redirect to the homepage
      navigate("/");
    } else {
      // If no token is found, redirect back to the login page or handle the error
      notifications.show({
        message: "No token found, please try logging in again.",
        withBorder: true,
        color: "red",
      });
      navigate("/login");
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default LoginSuccess;
