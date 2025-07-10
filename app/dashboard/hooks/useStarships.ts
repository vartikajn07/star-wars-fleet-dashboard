import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

interface UseStarshipsProps {
  search?: string;
  page?: string;
}

export const useStarships = ({ search, page }: UseStarshipsProps) => {
  return useQuery({
    queryKey: ["starships", { search, page }],
    queryFn: async () => {
      const response = await apiClient.getStarships({
        query: { search, page },
      });

      if (response.status === 200) {
        return response.body;
      } else {
        throw new Error("Failed to fetch starships");
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};
