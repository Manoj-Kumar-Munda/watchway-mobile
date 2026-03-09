import { endpoints } from "@/config/endpoints";
import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, IVideo } from "./types";

interface IVideoListResponse {
  data: {
    docs: IVideo[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export const useVideoList = () => {
  return useQuery<ApiResponse<IVideoListResponse>>({
    queryKey: endpoints.videos.list.queryKeys,
    queryFn: () => {
      return apiClient.get(endpoints.videos.list.url);
    },
  });
};
