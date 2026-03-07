import { endpoints } from "@/config/endpoints";
import apiClient from "@/lib/api-client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse, IUser } from "./types";
import { SignInFormData } from "@/lib/validations/auth";


interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  loggedInUser: IUser;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: SignInFormData) => {
      return apiClient.post<ApiResponse<LoginResponse>>(
        endpoints.auth.login.url,
        data
      );
    },
    onSettled: () => {
      new QueryClient().invalidateQueries({
        queryKey: endpoints.users.currentUser.queryKeys,
      });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: endpoints.users.currentUser.queryKeys,
    queryFn: () => {
      return apiClient.get<ApiResponse<IUser>>(endpoints.users.currentUser.url);
    },
    retry: false,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return apiClient.post<ApiResponse<IUser>>(endpoints.auth.register.url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSettled: () => {
      new QueryClient().invalidateQueries({
        queryKey: endpoints.users.currentUser.queryKeys,
      });
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => {
      return apiClient.post<ApiResponse<void>>(endpoints.auth.logout.url);
    },
    onSuccess: () => {
      new QueryClient().invalidateQueries({
        queryKey: endpoints.users.currentUser.queryKeys,
      });
    },
  });
};
