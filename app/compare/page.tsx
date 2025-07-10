"use client";
import { useAtom, useSetAtom } from "jotai";
import {
  selectedStarshipsAtom,
  compareSelectionAtom,
  toggleCompareSelectionAtom,
} from "../../lib/state/atoms";
import { Button } from "@/components/ui/button";

export default function ComparePage() {
  const [selectedStarships] = useAtom(selectedStarshipsAtom);
  const [compareSelection] = useAtom(compareSelectionAtom);
  const toggleCompare = useSetAtom(toggleCompareSelectionAtom);
  console.log(selectedStarships);

  return (
    <div className="w-full h-screen px-16 py-20">
      <div className=" flex flex-col items-center gap-10">
        <h1 className="text-2xl font-bold">Compare Starships</h1>

        {selectedStarships.length === 0 ? (
          <p>No starships selected yet. Go back to dashboard</p>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {selectedStarships.map((ship) => {
              const isSelected = compareSelection.some(
                (s) => s.url === ship.url
              );

              return (
                <div
                  key={ship.url}
                  className={`border p-4 rounded-md transition-colors cursor-pointer ${
                    isSelected ? "border-yellow-500" : "border-gray-300"
                  }`}
                  onClick={() => toggleCompare(ship)}
                >
                  <h2 className="text-lg font-semibold">{ship.name}</h2>
                  <p className="text-sm">{ship.model}</p>
                  <p className="text-xs">{ship.manufacturer}</p>
                  <p className="text-xs mt-2">Crew: {ship.crew}</p>
                  <p className="text-xs">
                    Hyperdrive: {ship.hyperdrive_rating}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {compareSelection.length >= 2 && (
          <div className="flex justify-end mt-6">
            <Button>Compare ({compareSelection.length})</Button>
          </div>
        )}
      </div>
    </div>
  );
}
