import apiClient from "@/apiClient";

const route = "/notification";

// Define the types for the Notification and NotificationResponse
interface Notification {}

interface NotificationResponse {
  notifications: Notification[];
}

// Function to get the current user's notifications
const getNotifications = async (): Promise<Notification[]> => {
  const { data } = await apiClient.get(`${route}/current`);
  return data;
};

const updateRead = async (
  id: string | number,
  isRead: boolean
): Promise<void> => {
  await apiClient.put(`${route}/${id}`, { isRead });
};

export default {
  getNotifications,
  updateRead,
};
