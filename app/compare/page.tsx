"use client";
import { useAtom, useSetAtom } from "jotai";
import {
  selectedStarshipsAtom,
  compareSelectionAtom,
  toggleCompareSelectionAtom,
} from "../../lib/state/atoms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function ComparePage() {
  const [selectedStarships] = useAtom(selectedStarshipsAtom);
  const [compareSelection] = useAtom(compareSelectionAtom);
  const toggleCompare = useSetAtom(toggleCompareSelectionAtom);
  const [isOpen, setIsOpen] = useState(false);

  console.log(selectedStarships);

  //ratingss
  const getStarsFromRating = (rating: string) => {
    const value = parseFloat(rating);
    const stars = Math.round(5 - value);
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            strokeWidth={1}
            className={
              i < stars ? "stroke-yellow-300 fill-yellow-300" : "stroke-none"
            }
          />
        ))}
      </div>
    );
  };

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
                  className={`border border-[#eaeaea] relative px-4 py-3 flex flex-col rounded-md  cursor-pointer `}
                  onClick={() => toggleCompare(ship)}
                >
                  <Checkbox
                    className="absolute top-3 right-3"
                    checked={isSelected}
                    onCheckedChange={() => toggleCompare(ship)}
                    disabled={!isSelected && compareSelection.length >= 3}
                  />
                  <h1 className="text-lg font-semibold">{ship.name}</h1>
                  <h1 className="text-sm mt-5">{ship.model}</h1>
                  <h1 className="text-xs mt-2">
                    Hyperdrive: {ship.hyperdrive_rating}
                  </h1>
                </div>
              );
            })}
          </div>
        )}
        {compareSelection.length >= 2 && (
          <Button onClick={() => setIsOpen(true)}>
            Compare ({compareSelection.length})
          </Button>
        )}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-[800px] max-w-none h-fit overflow-auto py-6">
            <DialogHeader>
              <DialogTitle className="mb-6 text-center">
                Comparison Overview
              </DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Crew</TableHead>
                  <TableHead>Hyperdrive</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compareSelection.map((ship) => (
                  <TableRow key={ship.url}>
                    <TableCell>{ship.name}</TableCell>
                    <TableCell>{ship.model}</TableCell>
                    <TableCell>{ship.crew}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStarsFromRating(ship.hyperdrive_rating)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
