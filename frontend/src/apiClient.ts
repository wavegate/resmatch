import axios from "axios";
import { notifications } from "@mantine/notifications";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the Authorization token for any request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.error) {
      notifications.show({
        message: error.response.data.error,
        withBorder: true,
        color: "red",
      });
    } else {
      notifications.show({
        message: "An unknown error occurred. Please try again.",
        withBorder: true,
        color: "red",
      });
    }
    return Promise.reject(error);
  }
);
export default apiClient;
