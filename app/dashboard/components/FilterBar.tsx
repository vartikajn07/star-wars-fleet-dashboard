"use client";
import { useAtom } from "jotai";
import {
  searchQueryAtom,
  hyperdriveFilterAtom,
  crewSizeFilterAtom,
  HyperdriveFilter,
  CrewSizeFilter,
  selectedStarshipsAtom,
} from "@/lib/state/atoms";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const FilterBar = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [hyperdriveFilter, setHyperdriveFilter] = useAtom(hyperdriveFilterAtom);
  const [crewSizeFilter, setCrewSizeFilter] = useAtom(crewSizeFilterAtom);
  const [selectedStarships] = useAtom(selectedStarshipsAtom);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col mb-6">
      <div className="flex  justify-between items-center gap-4 ">
        {/*search inputt */}
        <div className="w-full md:w-1/3 flex items-center lg:gap-3 gap-1 lg:px-4 px-2 py-2 lg:text-base text-sm bg-[#343434] rounded-md">
          <Search className="stroke-white w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search starships (starts with ...)"
            className="w-full text-white placeholder:text-white outline-none"
          />
        </div>
        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            className={`${showFilters ? "bg-gray-200" : ""} cursor-pointer`}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <Filter className="w-4 h-4" /> Filters
          </Button>
          {/* compare */}
          <Button
            disabled={selectedStarships.length < 2}
            className="cursor-pointer bg-[#343434]"
            onClick={() => router.push("/compare")}
          >
            Compare
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="flex gap-4 mt-4 w-full">
          {/*hyperdrive dropdwn */}
          <select
            value={hyperdriveFilter || ""}
            onChange={(e) =>
              setHyperdriveFilter((e.target.value as HyperdriveFilter) || null)
            }
            className="w-full lg:px-4 px-2 py-2 lg:text-base text-sm border border-gray-300 rounded-md"
          >
            <option value="">All Hyperdrive Ratings</option>
            <option value="<1.0">&lt; 1.0</option>
            <option value="1.0-2.0">1.0 - 2.0</option>
            <option value=">2.0">&gt; 2.0</option>
          </select>
          {/*crew size drpdwn */}
          <select
            value={crewSizeFilter || ""}
            onChange={(e) =>
              setCrewSizeFilter((e.target.value as CrewSizeFilter) || null)
            }
            className="w-full lg:px-4 px-2 py-2 lg:text-base text-sm border border-gray-300 rounded-md "
          >
            <option value="">All Crew Sizes</option>
            <option value="1-5">1 - 5</option>
            <option value="6-50">6 - 50</option>
            <option value="50+">50+</option>
          </select>
        </div>
      )}
    </div>
  );
};
