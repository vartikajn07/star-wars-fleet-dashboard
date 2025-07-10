import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

interface UseStarshipsProps {
  search?: string;
}

export const useStarships = ({ search }: UseStarshipsProps) => {
  return useInfiniteQuery({
    queryKey: ["starships", search],
    initialPageParam: "1",
    queryFn: async ({ pageParam = "1" }) => {
      const response = await apiClient.getStarships({
        query: { search, page: pageParam },
      });

      if (response.status !== 200) throw new Error("Failed to fetch starships");

      const { results, next, count } = response.body;

      const fullResults = await Promise.all(
        results.map(async (entry) => {
          const res = await fetch(entry.url);
          const data = await res.json();
          return data.result.properties;
        })
      );

      return {
        count,
        next,
        results: fullResults,
      };
    },
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.next;
      if (!nextUrl) return undefined;
      const url = new URL(nextUrl);
      return url.searchParams.get("page");
    },
    staleTime: 1000 * 60 * 5,
  });
};
