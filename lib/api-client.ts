import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

const REFRESH_TOKEN_PATH = "/api/v1/auth/refresh-token";

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
          await useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}${REFRESH_TOKEN_PATH}`,
          { refreshToken },
          { withCredentials: true },
        );

        const newAccessToken = response.data?.data?.accessToken;
        const newRefreshToken = response.data?.data?.refreshToken;

        if (newAccessToken) {
          useAuthStore
            .getState()
            .setTokens(newAccessToken, newRefreshToken ?? refreshToken);
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch {
        await useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
