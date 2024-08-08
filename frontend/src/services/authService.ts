import apiClient from "@/apiClient";

const route = "/auth";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  email: string;
  password: string;
}

export interface User {
  id: string | number;
  email: string;
  alias: string;
  // Add other user-related properties here
}

interface AuthResponse {
  token: string;
  user: User;
}

const login = async (formData: LoginFormData): Promise<AuthResponse> => {
  const { data } = await apiClient.post(`${route}/login`, formData);
  return data;
};

const register = async (formData: RegisterFormData): Promise<AuthResponse> => {
  const { data } = await apiClient.post(`${route}/register`, formData);
  return data;
};

const getCurrentUser = async (): Promise<User> => {
  const { data } = await apiClient.get(`${route}/current`);
  return data;
};

const confirmEmail = async (token: string): Promise<string> => {
  const { data } = await apiClient.get(`${route}/confirm-email?token=${token}`);
  return data.message;
};

export default {
  login,
  register,
  getCurrentUser,
  confirmEmail,
};
