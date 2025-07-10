"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useStarships } from "../hooks/useStarships";

export const StarshipTable = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useStarships({});

  const { ref, inView } = useInView();

  //loading more starships
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <p className="text-center">Loading starships...</p>;
  if (isError) return <p className=" text-center">Failed to load starships.</p>;

  const starships = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Model</th>
            <th className="px-4 py-2 border">Manufacturer</th>
            <th className="px-4 py-2 border">Crew</th>
            <th className="px-4 py-2 border">Hyperdrive</th>
          </tr>
        </thead>
        <tbody>
          {starships.map((ship, i) => (
            <tr key={ship.name + i} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{ship.name}</td>
              <td className="px-4 py-2 border">{ship.model}</td>
              <td className="px-4 py-2 border">{ship.manufacturer}</td>
              <td className="px-4 py-2 border">{ship.crew}</td>
              <td className="px-4 py-2 border">{ship.hyperdrive_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div ref={ref} className="py-4 text-center">
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll down to load more"
          : " All starships loaded"}
      </div>
    </div>
  );
};
