"use client";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useStarships } from "../hooks/useStarships";
import {
  selectedStarshipsAtom,
  toggleStarshipSelectionAtom,
} from "../../../lib/state/atoms";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAtom, useSetAtom } from "jotai";

export const StarshipTable = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useStarships();
  const [selectedStarships] = useAtom(selectedStarshipsAtom);
  const toggleSelection = useSetAtom(toggleStarshipSelectionAtom);
  const { ref, inView } = useInView();

  //loading more starships
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <p className="text-center">Loading more starships</p>;
  if (isError) return <p className=" text-center">Failed to load starships.</p>;

  const starships = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="overflow-x-auto">
      <Table className="w-full items-center">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-lg font-semibold">Name</TableHead>
            <TableHead className="text-lg font-semibold">Model</TableHead>
            <TableHead className="text-lg font-semibold">
              Manufacturer
            </TableHead>
            <TableHead className="text-lg font-semibold">Crew Size</TableHead>
            <TableHead className="text-lg font-semibold">
              Hyperdrive Rating
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-left">
          {starships.map((ship, i) => (
            <TableRow
              key={ship.name + i}
              onClick={() => toggleSelection(ship)}
              className={`
    cursor-pointer transition-colors
    ${selectedStarships.some((s) => s.url === ship.url) ? "bg-gray-100" : ""}
  `}
            >
              <TableCell>{ship.name}</TableCell>
              <TableCell>{ship.model}</TableCell>
              <TableCell>{ship.manufacturer}</TableCell>
              <TableCell>{ship.crew}</TableCell>
              <TableCell>{ship.hyperdrive_rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div ref={ref} className="py-4 text-center text-base">
        {isFetchingNextPage
          ? "Incoming more fleets..."
          : hasNextPage
          ? ""
          : "This is the end of the fleet."}
      </div>
    </div>
  );
};
