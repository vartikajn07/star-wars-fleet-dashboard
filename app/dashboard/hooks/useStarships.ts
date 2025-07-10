import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import {
  searchQueryAtom,
  hyperdriveFilterAtom,
  crewSizeFilterAtom,
} from "@/lib/state/atoms";
import { apiClient } from "@/lib/api/client";
import { useDebounce } from "./useDebounce";
import { getStarshipDetails } from "@/lib/utils/starshipCache";

export const useStarships = () => {
  const rawSearch = useAtomValue(searchQueryAtom);
  const search = useDebounce(rawSearch, 400);
  const hyperdriveFilter = useAtomValue(hyperdriveFilterAtom);
  const crewSizeFilter = useAtomValue(crewSizeFilterAtom);

  return useInfiniteQuery({
    queryKey: ["starships", search, hyperdriveFilter, crewSizeFilter],
    initialPageParam: "1",
    queryFn: async ({ pageParam = "1" }) => {
      const response = await apiClient.getStarships({
        query: { search, page: pageParam },
      });

      if (response.status !== 200) throw new Error("Failed to fetch starships");

      const { results, next, count } = response.body;

      const fullResults = await Promise.all(
        results.map((entry) => getStarshipDetails(entry.url))
      );
      const filteredByName = fullResults.filter((ship) =>
        ship.name.toLowerCase().startsWith(search.toLowerCase())
      );
      const filteredResults = filteredByName.filter((ship) => {
        const hyperdrive = parseFloat(ship.hyperdrive_rating);
        const crew = parseInt(ship.crew.replace(/[^0-9]/g, ""), 10);

        const matchesHyperdrive =
          !hyperdriveFilter ||
          (hyperdriveFilter === "<1.0" && hyperdrive < 1.0) ||
          (hyperdriveFilter === "1.0-2.0" &&
            hyperdrive >= 1.0 &&
            hyperdrive <= 2.0) ||
          (hyperdriveFilter === ">2.0" && hyperdrive > 2.0);

        const matchesCrew =
          !crewSizeFilter ||
          (crewSizeFilter === "1-5" && crew >= 1 && crew <= 5) ||
          (crewSizeFilter === "6-50" && crew >= 6 && crew <= 50) ||
          (crewSizeFilter === "50+" && crew > 50);

        return matchesHyperdrive && matchesCrew;
      });

      return {
        count,
        next,
        results: filteredResults,
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
